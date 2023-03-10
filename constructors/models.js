/** Constructor */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from "three";



export default class CreateModel {

    constructor(options) {

        this.options = options
    }

    get addModel() {

        return this._loader(this.options.model, this.options.scene, this.options.scale, this.options.name, this.options.meshStore, this.options.material, )

    }

    _loader(model, scene, scale, name,mStore, material) {


        new GLTFLoader().load(model, (gltf) => {

            let originalMesh
            let cloneMesh
            
            let otherMesh = gltf.scene

            otherMesh.traverse((child) => {

            	if (child.isMesh) {

                    otherMesh.userData[child.name] = child.material
                    child.material.transparent = true
                    child.material.envMap = material
                    child.material.envMapIntensity = 5
   
                    // child.material.metalness = 0.7

                    child.material.needsUpdate = true

            		// child.frustumCulled = false;

            		// originalMesh = child

            		// cloneMesh = child.geometry.clone()

            	}

            })

            // let otherMesh = new THREE.Mesh(cloneMesh, material)


            otherMesh.name = name

            // if (rotationStatic) {
            //     otherMesh.rotation.x = rotationStatic.x
            //     otherMesh.rotation.y = rotationStatic.y
            //     otherMesh.rotation.y = rotationStatic.z
            // }

            if (scale) {
                otherMesh.scale.set(scale.x, scale.y, scale.z)
            }

            // if (position) {
            //     otherMesh.position.x = position.x
            //     otherMesh.position.y = position.y
            //     otherMesh.position.z = position.z
            // }

            scene.add(otherMesh)

            mStore[otherMesh.name]= otherMesh
  
        }
        )

    }

    _getModel() {
        return this.mod
        // const promise = Promise.resolve(this.mod)

        // async function PromiseExample() {

        //     try {
        //         const value = await promise;

        //         return value

        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // return PromiseExample()
    }
}

// exports.Model = Model 