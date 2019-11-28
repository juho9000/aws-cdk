import { ConcreteWidget } from "./widget";

/**
 * Properties for a log widget
 */
export interface LogWidgetProps {
  /**
   * The name of log group
   */
  readonly logGroup: string;

  /**
   * The logs insights query to run
   */
  readonly query: string;

  /**
   * The region to use
   */

   readonly region: string;

   /**
    * Title of the widget
    */
  readonly title: string;

  /**
   * Width of the widget, in a grid of 24 units wide
   *
   * @default 24
   */
  readonly width?: number;

  /**
   * Height of the widget
   *
   * @default 12
   */
  readonly height?: number;
}

/**
 * A dashboard widget that displays logs from logs insights
 */
export class LogWidget extends ConcreteWidget {
  private readonly logGroup: string;
  private readonly query: string;
  private readonly region: string;
  private readonly title: string;

  constructor(props: LogWidgetProps) {
    super(props.width || 24, props.height || 12);
    this.logGroup = props.logGroup;
    this.query = props.query;
    this.region = props.region;
    this.title = props.title;
  }

  public position(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public toJson(): any[] {
    return [
      {
        type: "log",
        width: this.width,
        height: this.height,
        x: this.x,
        y: this.y,
        properties: {
          query: `SOURCE '${this.logGroup}' | ${this.query}`,
          region: this.region,
          title: this.title,
          view: "table"
        }
      }
    ];
  }
}
