/**
 *  @file       EuclideanVisualizerRenderer.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import bjorklund from 'bjorklund-js';
import { turquoiseLightColor, asHexNumber } from 'constants/colors';

const OUTER_CIRCLE_LINE_WIDTH = 2;
const OUTER_CIRCLE_RADIUS = 3 + OUTER_CIRCLE_LINE_WIDTH;
const INNER_CIRCLE_RADIUS = 3;
const OUTER_CIRCLE_COLOR = asHexNumber(turquoiseLightColor);
const INNER_CIRCLE_COLOR = asHexNumber(turquoiseLightColor);
const POLYGON_COLOR = asHexNumber(turquoiseLightColor);
const POLYGON_LINE_WIDTH = 2;

function generateTexture (renderer, texture) {
  return renderer.generateTexture(texture, PIXI.SCALE_MODES.LINEAR, 8);
}

function createEmptyCircleTexture (renderer) {
  const emptyCircle = new PIXI.Graphics();
  emptyCircle.alpha = 0.5;
  emptyCircle.lineStyle(
    OUTER_CIRCLE_LINE_WIDTH,
    OUTER_CIRCLE_COLOR,
    1,
    0
  );
  emptyCircle.drawCircle(
    0,
    0,
    OUTER_CIRCLE_RADIUS
  );
  const texture = generateTexture(renderer, emptyCircle);
  texture.defaultAnchor.set(0.5, 0.5);
  return texture;
}
function createInnerCircleTexture (renderer) {
  const centerCircle = new PIXI.Graphics();
  centerCircle.beginFill(INNER_CIRCLE_COLOR, 1.0);
  centerCircle.drawCircle(
    0,
    0,
    INNER_CIRCLE_RADIUS
  );
  centerCircle.endFill();
  const texture = generateTexture(renderer, centerCircle);
  texture.defaultAnchor.set(0.5, 0.5);
  return texture;
}


class EuclideanVisualizerRenderer {
  constructor(props) {

    this.props = props;

    const {
      size,
      canvasEl
    } = props;

    this.pixiApp = new PIXI.Application({
      height: size,
      width: size,
      view: canvasEl,
      transparent: true,
      resolution: 1,
      antialias: true
    });

    //this.pixiApp.renderer.backgroundColor = 0x061639;

    this.pixiApp.start();

    this.emptyCircleTexture = createEmptyCircleTexture(this.pixiApp.renderer);
    this.innerCircleTexture = createInnerCircleTexture(this.pixiApp.renderer);

    const container = new PIXI.Container();
    const outer = new PIXI.Sprite(this.emptyCircleTexture);
    const inner = new PIXI.Sprite(this.innerCircleTexture);

    container.addChild(outer);
    container.addChild(inner);
    container.position.set(OUTER_CIRCLE_RADIUS, OUTER_CIRCLE_RADIUS);
    this.pixiApp.stage.addChild(container);

  }

  render(props) {
    const {
      euclideanNumHits,
      euclideanTotalNumHits
    } = props;

    const {
      stage
    } = this.pixiApp;

    const {
      size
    } = this.props;

    const euclideanCircleRadius = 0.5 * size - OUTER_CIRCLE_RADIUS;

    stage.removeChildren();

    const circleContainer = new PIXI.Container();

    circleContainer.position.set(
      euclideanCircleRadius + OUTER_CIRCLE_RADIUS,
      euclideanCircleRadius + OUTER_CIRCLE_RADIUS
    );

    const pattern = _.flatten(
      Array(2).fill(bjorklund(euclideanTotalNumHits, euclideanNumHits))
    ).slice(0, euclideanTotalNumHits);
    //const pattern = [1, 1, 1, 1];
    //const pattern = [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0  ];
    //const pattern = [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0  ];

    const segmentAngle = Math.PI * 2.0 / pattern.length;

    const polygonPoints = [];
    let i;
    for (i = 0; i < pattern.length; i++) {
      // calculate dot position
      const dotPosition = {
        x: euclideanCircleRadius * Math.cos(segmentAngle * i),
        y: euclideanCircleRadius * Math.sin(segmentAngle * i)
      };

      // create a container for the dots in that position
      const dotContainer = new PIXI.Container();
      dotContainer.position.set(dotPosition.x, dotPosition.y);

      // inner and outer dots
      const outer = new PIXI.Sprite(this.emptyCircleTexture);
      const inner = new PIXI.Sprite(this.innerCircleTexture);
      if (pattern[i] === 0) {
        inner.visible = false;
      } else {
        polygonPoints.push(dotContainer.x, dotContainer.y);
      }
      dotContainer.addChild(outer);
      dotContainer.addChild(inner);

      circleContainer.addChild(dotContainer);

    }

    // draw polygon connecting active dots
    const polygon = new PIXI.Graphics();
    polygon.lineStyle(
      POLYGON_LINE_WIDTH,
      POLYGON_COLOR,
      1,
      0
    );
    // add last line segment connecting fully
    polygonPoints.push(polygonPoints[0], polygonPoints[1]);
    polygon.drawPolygon(polygonPoints);
    circleContainer.addChild(polygon);
    stage.addChild(circleContainer);
  }
}

export default EuclideanVisualizerRenderer;
