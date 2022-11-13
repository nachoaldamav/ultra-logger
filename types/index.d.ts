import type { Events } from "../../types/events";

declare global {
  var events: Events;
  var lastLine: number;
}
