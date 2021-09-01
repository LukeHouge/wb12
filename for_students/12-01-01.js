/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";

let mydiv = document.getElementById("div1");

let ct = new T.CubeTextureLoader().load([
  "./images/scene-page1/Right.png",
  "./images/scene-page1/Left.png",
  "./images/scene-page1/Top.png",
  "./images/scene-page1/Bottom.png",
  "./images/scene-page1/Back.png",
  " ./images/scene-page1/Front.png",
]);

let bumps = new T.TextureLoader().load("./images/scene-page1/map.tif");

let world = new GrWorld({
  groundplane: false,
  width: mydiv ? 600 : 800,
  height: 600,
  where: mydiv,
});

world.scene.background = ct;

let shaderMat = new T.MeshStandardMaterial({
  color: "white",
  side: T.DoubleSide,
  bumpMap: bumps,
  envMap: ct,
  metalness: 1.0,
  roughness: 0,
});

let sph = new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat });

let cb = InputHelpers.makeCheckbox("BumpMap");
cb.checked = true;
cb.onchange = function () {
  if (cb.checked) {
    shaderMat.bumpMap = bumps;
    shaderMat.needsUpdate = true;
  } else {
    shaderMat.bumpMap = undefined;
    shaderMat.needsUpdate = true;
  }
};

world.add(sph);

world.go();
