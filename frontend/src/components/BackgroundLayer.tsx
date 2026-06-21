import LightRays from "./reactbits.dev/LightRays";

function BackgroundLayer() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <LightRays
        raysOrigin="bottom-center"
        raysSpeed={1.7}
        rayLength={2.9}
        mouseInfluence={0.6}
        raysColor="var(--bg-rays-color)"
        className="w-full h-full"
      />
    </div>
  );
}

export default BackgroundLayer;
