
export interface Action {
  /**
   * The icon of the action button.
   */
  icon: string;

  /**
   * The title of the action button.
   */
  title: string;

  /**
   * The message that will be shown after the action was executed.
   */
  message?: string | string[];

  /**
   * The click handler for the action button that executes the action.
   */
  click: () => void;
}
