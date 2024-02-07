import Paper, { Point, Rectangle } from 'paper';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import Tools from './Tools';
import DrawArea from './DrawArea';
import useHistory from '../useHistory';
import createSimplePath from '../createSimplePath';
import setupGuidelines from '../tooling/guidelines-1';
import setupZoom from '../tooling/zoom';
import { FILL_COLORS, Modes, PATH_PARAM_NAME } from '../constants';
import handleHit from '../handleHit';
import addPoint from '../addPoint';
import draw from '../draw';
import shapeToDataUrl from '../shapeToDataUrl';

import classes from './styles.module.scss';
import Paths from './Paths';
import { PaperMouseEvent } from '../types';

const hitOptions = {
  segments: true,
  stroke: true,
  handles: true,
  fill: true,
  tolerance: 5,
};

// @ts-ignore
const getProject = () => window.project as paper.Project;
const getLayer = () => getProject().layers[0];

const Layout = () => {
  const { setHistoryItem, undo, redo } = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPath = useRef<paper.Path | null>();
  const tolerance = useRef(5);
  const readyRef = useRef(false);
  const [mode, setMode] = useState<Modes>(Modes.pen);
  const [showGrid, setShowGrid] = useState(false);

  const createPath = useCallback((data: string) => {
    currentPath.current?.remove();
    if (!data) return;
    currentPath.current = createSimplePath(data);
  }, []);

  const isDrawMode = mode === Modes.draw;

  const addEvents = useCallback(
    (guidelines: ReturnType<typeof setupGuidelines>) => {
      const project = getProject();
      Paper.view.onMouseDown = (e: PaperMouseEvent) => {
        const nativeEvent = e.event;
        if (nativeEvent.altKey) return;
        document.addEventListener(
          'mouseup',
          () => {
            guidelines.remove();
            setHistoryItem(project.layers[0].exportJSON());
          },
          { once: true },
        );

        if (currentPath.current) {
          const hitResult = project.hitTest(e.point, hitOptions);
          Paper.view.onMouseDrag = () => {};
          Paper.view.onMouseUp = () => {};
          if (!nativeEvent.metaKey && hitResult) {
            // @ts-ignore
            handleHit(e, hitResult, currentPath.current, guidelines, getLayer().children);
            return;
          }
          if (nativeEvent.metaKey || !isDrawMode) {
            addPoint(currentPath.current, e.point);
            return;
          }
        } else {
          currentPath.current = createSimplePath();
          currentPath.current.add(e.point);
        }

        if (isDrawMode) {
          draw(currentPath.current, tolerance.current);
        }
      };
    },
    [isDrawMode, setHistoryItem],
  );

  const close = useCallback(() => {}, []);

  const apply = useCallback(async () => {
    // @ts-ignore
    const clonedLayers = (window.project as paper.Project).layers[0].clone();
    clonedLayers.bounds.topLeft = new Point([0, 0]);
    clonedLayers.children.forEach((path, idx) => {
      const color = FILL_COLORS[idx % FILL_COLORS.length];
      /* eslint-disable no-param-reassign */
      path.fillColor = new paper.Color(color);
      (path as paper.Path).closed = true;
      /* eslint-disable no-param-reassign */
    });
    const path = clonedLayers.exportSVG({ asString: true, view: new Rectangle([0, 0, 100, 100]) });
    clonedLayers.remove();
    const { bounds } = clonedLayers.view;
    shapeToDataUrl(path as string, bounds);
    close();
  }, [close]);

  const guidelines = useRef<ReturnType<typeof setupGuidelines>>();
  useLayoutEffect(() => {
    if (!readyRef.current) {
      Paper.setup('drawingCanvas');
      Paper.install(window);
      readyRef.current = true;
      const searchParams = new URLSearchParams(window.location.search);
      const path = searchParams.get(PATH_PARAM_NAME);
      if (path) {
        createPath(path);
      }
      if (containerRef.current) {
        guidelines.current = setupGuidelines(containerRef.current);
        setupZoom(containerRef.current, Paper.view);
      }
    }
    addEvents(guidelines.current!);
  }, [addEvents, createPath]);

  const _undo = useCallback(() => {
    const pathData = undo();
    getLayer().importJSON(pathData);
  }, [undo]);

  const _redo = useCallback(() => {
    const pathData = redo();
    if (pathData) {
      getLayer().importJSON(pathData);
    }
  }, [redo]);

  const addPath = useCallback(() => {
    const segmentsCount = currentPath.current?.segments.length || 0;
    if (segmentsCount > 2) {
      currentPath.current = createSimplePath();
    }
  }, []);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        addPath();
        return;
      }
      if (e.metaKey && e.code === 'KeyZ') {
        if (e.shiftKey) {
          _redo();
        } else {
          _undo();
        }
      }
    },
    [_redo, _undo, addPath],
  );

  useLayoutEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [undo, redo, handleKeydown]);

  const clear = useCallback(() => {
    currentPath.current?.remove();
    currentPath.current = null;
  }, []);

  const createPathString = useCallback(() => {
    return currentPath.current?.pathData;
  }, []);

  // @ts-ignore
  const paths: paper.Path[] = (window.project as paper.Project)?.layers[0]?.children || [];

  const [_, forceUpdate] = useState({});
  const selectPath = useCallback(
    (idx: number) => {
      const path = paths[idx];
      if (path) {
        currentPath.current = paths[idx];
        forceUpdate({});
      }
    },
    [paths],
  );

  return (
    <div className={classes.layout}>
      <Tools
        createPathString={createPathString}
        addPath={addPath}
        undo={_undo}
        redo={_redo}
        showGrid={showGrid}
        close={close}
        mode={mode}
        setMode={setMode}
        setShowGrid={setShowGrid}
        apply={apply}
        clear={clear}
      />

      <DrawArea showGrid={showGrid} containerRef={containerRef} />
      <Paths paths={paths} setPath={selectPath} selected={currentPath.current?.id} />
    </div>
  );
};

export default Layout;
