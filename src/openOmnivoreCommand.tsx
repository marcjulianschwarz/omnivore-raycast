import { open, showHUD } from "@raycast/api";

export default async function OpenOmnivoreCommand() {
  open("https://omnivore.app/home");
  showHUD("Opening Omnivore");
}
