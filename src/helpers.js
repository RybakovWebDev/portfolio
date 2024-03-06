import { ExtrudeGeometry, Shape, Mesh, Group } from "three";

export const createXShape = (material) => {
  const shape1 = new Shape();
  shape1.moveTo(-0.375, -2);
  shape1.lineTo(0.375, -2);
  shape1.lineTo(0.375, 2);
  shape1.lineTo(-0.375, 2);
  shape1.lineTo(-0.375, -2);

  const shape2 = new Shape();
  shape2.moveTo(-2, -0.375);
  shape2.lineTo(2, -0.375);
  shape2.lineTo(2, 0.375);
  shape2.lineTo(-2, 0.375);
  shape2.lineTo(-2, -0.375);

  const extrudeSettings = {
    steps: 2,
    depth: 0.6,
    bevelEnabled: false,
  };

  const geometry1 = new ExtrudeGeometry(shape1, extrudeSettings);
  const geometry2 = new ExtrudeGeometry(shape2, extrudeSettings);

  const mesh1 = new Mesh(geometry1, material);
  const mesh2 = new Mesh(geometry2, material);

  const group = new Group();
  group.add(mesh1);
  group.add(mesh2);

  return group;
};

export const scrollToRef = (ref) => {
  const smallScreen = window.innerWidth < 1430;
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: smallScreen ? "start" : "center",
  });
  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
};

export const calculateVideoHeight = (viewportWidth, maxHeight, minHeight = 125) => {
  const minWidth = 280;
  const maxWidth = 1430;

  // Calculate the ratio of the difference between the current and minimum viewport widths
  // to the difference between the maximum and minimum viewport widths
  const ratio = (viewportWidth - minWidth) / (maxWidth - minWidth);

  // Calculate the video height based on the ratio
  let videoHeight = minHeight + ratio * (maxHeight - minHeight);

  // Ensure the video height is within the minimum and maximum limits
  videoHeight = Math.max(minHeight, Math.min(maxHeight, videoHeight));

  // Round the video height to the nearest whole number
  return viewportWidth > 1430 || !viewportWidth ? maxHeight : Math.round(videoHeight);
};
