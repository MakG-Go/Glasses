<template >
  <div>
    <div class="webGl"></div>
    <div class="webGl__btn_container">
      <!-- <btn
        @generate="check"
        :mesh-color="'f33232'"
        :button-color="'RED'"
      ></btn>

      <btn
        @generate="check"
        :mesh-color="'324ff3'"
        :button-color="'BLUE'"
      ></btn> -->
    </div>
  </div>
</template>
  
  
<script>
import store from "~~/store";
// import btn from "./ui/btn.vue";
import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CreateModel from "../constructors/models.js";

export default {
  components: {
    // btn,
  },
  data() {
    return {
      states: [],
      color: "#00527C",
      glasses: {
        // 'model':'_nuxt/models/vega-black-blue.glb',
        model: "/models/glasses.glb",
        scale: 1,
      },
      enviermens: "/environmentMaps",
      colorGlass:{
        index: "#0AB7BF",
        about: "#0AB7BF",
        portfolio: "#0AB7BF",
      },
      colorDecor: {
        index: "#00527C",
        about: "#9FC924",
        portfolio: "#A20016",
      },
      colorFrame: {
        index: "black",
        about: "#A19C9C",
        portfolio: "black",
      },
    };
  },
  beforeMount() {
    this.color = this.colorDecor[this.page];
    this.frameColor = this.colorFrame[this.page];
    this.glassColor = this.colorGlass[this.page]
    this.sizes = this.getSizes();
    this.meshes = {};
    this.start = true;
  },
  mounted() {
    this.init();
    this.resize();
    this.tick();
  },
  computed: {
    page() {
      return store.state.page;
    },
  },
  watch: {
    page: function (newValue, prevValue) {
      this.color = this.colorDecor[newValue];
      this.frameColor = this.colorFrame[newValue];
      this.glassColor = this.colorGlass[newValue]
      let target = this.meshes["Glasses"].userData;

      target["_decor"].color.set(this.color);
      target["_frame"].color.set(this.frameColor);
      target["_glass"].color.set(this.glassColor);
      target["_glass"].envMapIntensity = 5;

      // target["_glass"].emissive.set(this.color);
      target["_glass"].opacity = 0.5;
      target["_glass"].roughness = 0.05;
    },
  },
  methods: {
    init() {
      // Debug
      // this.gui = new dat.GUI({
      //   width: 500,
      // });

      this.canvas = document.querySelector(".webGl");

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45,
        this.sizes.width / this.sizes.height,
        0.01,
        100
      );

      this.camera.position.x = 0;
      this.camera.position.y = 0.2;
      this.camera.position.z = 0.5;

      /**
       * Renderer
       */
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.shadowMap.enabled = true;
      this.renderer.physicallyCorrectLights = true;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.NoToneMapping;
      this.renderer.setClearColor("black", 0);
      this.canvas.appendChild(this.renderer.domElement);

      this.scene.add(this.camera);

      // this.gui.add(this.renderer, "toneMapping", {
      //   No: THREE.NoToneMapping,
      //   Linier: THREE.LinearToneMapping,
      //   Reinhard: THREE.ReinhardToneMapping,
      //   Cineon: THREE.CineonToneMapping,
      //   ACESFilmic: THREE.ACESFilmicToneMapping,
      //   Custom: THREE.CustomToneMapping,
      // });

      /* CubeTextureLoader */

      this.cubeTextureLoader = new THREE.CubeTextureLoader();
      this.environmentMap = this.cubeTextureLoader.load([
        this.enviermens + "/4/px.jpg",
        this.enviermens + "/4/nx.jpg",
        this.enviermens + "/4/py.jpg",
        this.enviermens + "/4/ny.jpg",
        this.enviermens + "/4/pz.jpg",
        this.enviermens + "/4/nz.jpg",
      ]);

      this.environmentMap.encoding = THREE.sRGBEncoding;

      // this.scene.background = this.environmentMap;
      // this.scene.environment = this.environmentMap;

      /** Controls */
      this.controls = new OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
      this.controls.maxDistance = 0.8;
      this.controls.minDistance = 0.35;

      /**
       * Mesh
       */

      this.planeMaterial = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        wireframe: false,
      });

      this.planeMaterial.color.set(this.color);

      this.planeGeometry = new THREE.BoxGeometry(1, 1, 1);

      this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);

      // this.scene.add(this.plane);

      /** Model */

      let glass = new CreateModel({
        model: this.glasses.model,
        scene: this.scene,
        scale: new THREE.Vector3(
          this.glasses.scale,
          this.glasses.scale,
          this.glasses.scale
        ),
        name: "Glasses",
        meshStore: this.meshes,
        material: this.environmentMap
      });

      glass.addModel;

      // console.log(this.scene.children);
      // console.log(glass._getModel())

      /** Light */

      // this.ambientLight = new THREE.AmbientLight(0x404040, 2);
      // this.scene.add(this.ambientLight);

      // this.pointLight = new THREE.PointLight(0x404040, 10, 100);
      // this.pointLight.position.x = 0;
      // this.pointLight.position.y = 1;
      // this.pointLight.position.z = 0;
      // this.sphereSize = 1;

      // this.pointLightHelper = new THREE.PointLightHelper(
      //   this.pointLight,
      //   this.sphereSize
      // );

      // this.scene.add(this.pointLight);
      // this.scene.add(this.pointLightHelper);

      this.directionLight = new THREE.DirectionalLight({
        color: "#ffffff",
      });
      this.directionLight.intensity = 6;
      this.directionLight.castShadow = false;
      this.directionLight.shadow.camera.far = 10;
      this.directionLight.shadow.camera.near = 0.01;
      this.directionLight.shadow.mapSize.set(128, 128);
      this.directionLight.position.set(-1, 0, -1);
      //  correct shadow glich
      this.directionLight.shadow.normalBias = 0.005;
      this.directionLight.shadow.bias = -0.005;
      this.scene.add(this.directionLight);

      // this.directionLightCameraHelper = new THREE.CameraHelper(
      //   this.directionLight.shadow.camera
      // );
      // this.scene.add(this.directionLightCameraHelper);

      // this.gui
      //   .add(this.directionLight.position, "x")
      //   .min(-1)
      //   .max(5)
      //   .step(0.001)
      //   .name("P_Light X");
      // this.gui
      //   .add(this.directionLight.position, "y")
      //   .min(-1)
      //   .max(5)
      //   .step(0.001)
      //   .name("P_Light Y");
      // this.gui
      //   .add(this.directionLight.position, "z")
      //   .min(-1)
      //   .max(5)
      //   .step(0.001)
      //   .name("P_Light Z");
      // this.gui
      //   .add(this.directionLight, "intensity")
      //   .min(-1)
      //   .max(30)
      //   .step(0.001)
      //   .name("P_Light intensity");
      // this.gui
      //   .add(this.ambientLight, "intensity")
      //   .min(-1)
      //   .max(30)
      //   .step(0.001)
      //   .name("A_Light intensity");

      /** Clock */

      this.clock = new THREE.Clock();
    },

    tick() {
      const elapsedTime = this.clock.getElapsedTime();
      let delta = elapsedTime - this.prev;
      this.prev = delta;

      this.planeMaterial.color.set(this.color);
      // this.plane.rotation.y += 0.01;

      /** Meshes */
      let meshesStoreLength = Object.keys(this.meshes).length;

      if (meshesStoreLength > 0) {
        if (this.start) {
          console.log('1')
          this.meshes["Glasses"].userData["_decor"].color.set(this.color);
          this.meshes["Glasses"].userData["_frame"].color.set(this.frameColor);
          this.meshes["Glasses"].userData["_glass"].color.set(this.glassColor);
          this.meshes["Glasses"].userData["_glass"].envMapIntensity = 2;

          // this.meshes["Glasses"].userData["_glass"].emissive.set(this.color);
          this.meshes["Glasses"].userData["_glass"].opacity = 0.5;
          this.meshes["Glasses"].userData["_glass"].roughness = 0;
          this.start = false
        }

        this.meshes["Glasses"].rotation.y += 0.005;
      }

      // Controls
      this.controls.update();
      // Render
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(this.tick);
    },

    getSizes() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    resize() {
      window.addEventListener("resize", () => {
        // Update sizes
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        // Update camera
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        // Update renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    },
  },
};
</script>
  
  <style lang="scss">
.webGl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  &__btn {
    &_container {
      z-index: 1;
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 150px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
</style>
  