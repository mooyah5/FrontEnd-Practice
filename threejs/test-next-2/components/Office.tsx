import React, { useLayoutEffect, useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { ThreeElements, useFrame } from "@react-three/fiber";

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export function Office(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF("./models/rooms/WawaOffice.glb");

  const ref = useRef();
  const timeLine = useRef();

  const scroll = useScroll();

  useFrame(() => {
    // timeLine.current.seek(scroll.offset * timeLine.current.duration());

    timeLine.current.progress(scroll.offset);
  });

  useLayoutEffect(() => {
    timeLine.current = gsap.timeline();

    timeLine.current.to(
      ref.current.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );
  }, []);
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes["01_office"].geometry} material={materials["01"]} />
      <mesh
        geometry={nodes["02_library"].geometry}
        material={materials["02"]}
        position={[0, 2.114, -2.23]}
      />
      <mesh
        geometry={nodes["03_attic"].geometry}
        material={materials["03"]}
        position={[-1.97, 4.227, -2.199]}
      />
    </group>
  );
}

useGLTF.preload("./models/rooms/WawaOffice.glb");
