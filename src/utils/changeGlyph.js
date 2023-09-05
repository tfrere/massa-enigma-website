export const changeGlyph = (config, step) => {
  switch (step) {
    case 0:
      // S
      config.angle = 142;
      config.skewAngle = 12;
      config.poly = 1;
      break;
    case 1:
      // A
      config.angle = 24;
      config.skewAngle = 4.5;
      config.poly = 2;
      break;
    case 2:
      // M
      config.angle = 24;
      config.skewAngle = 6;
      config.poly = 3;
      break;
    case 3:
      // S
      config.angle = 37;
      config.skewAngle = 86;
      config.poly = 4;
      break;
    case 4:
      // A
      config.angle = 37;
      config.skewAngle = 86;
      config.poly = 5;
      break;
    case 5:
      // S
      config.angle = 142;
      config.skewAngle = 12;
      config.poly = 5;
      break;
    case 6:
      // S
      config.angle = 60;
      config.skewAngle = 40;
      config.poly = 6;
      break;
  }
  document.fract.set(config);
};

export default changeGlyph;
