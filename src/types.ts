export interface Vector2d {
  x: number;
  y: number;
}

export interface IComparablePoint extends Vector2d {
  w?: number;
  h?: number;
}

export type PaperMouseEvent = paper.MouseEvent & { event: MouseEvent };
