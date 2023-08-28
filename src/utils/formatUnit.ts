export default function formatUnit(unit: string): string {
  return unit.replace("2", "²").replace("3", "³");
}
