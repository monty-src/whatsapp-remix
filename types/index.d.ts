/**
 * @module types/index.d
 *
 *
 * @author montier.elliott@gmail.com
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      center: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}