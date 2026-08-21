/** Hazard-tape marquee. The run is repeated 3× so the CSS loop has no seam. */
export function Tape() {
  const run = (
    <>
      <span>36 HOURS</span>
      <b>◆</b>
      <span>4 TRACKS</span>
      <b>◆</b>
      <span>ONE BROKEN WORLD</span>
      <b>◆</b>
    </>
  );
  return (
    <div className="tape" aria-hidden="true">
      <div className="tape__run">
        {run}
        {run}
        {run}
      </div>
    </div>
  );
}
