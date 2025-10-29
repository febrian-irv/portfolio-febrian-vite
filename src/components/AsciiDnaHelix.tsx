import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "../effects/AsciiEffect";

interface AsciiDnaHelixProps {
  className?: string;
  width?: number;
  height?: number;
}

function AsciiDnaHelix({
  className = "",
  width = 800,
  height = 600
}: AsciiDnaHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const { sin, cos } = Math;
    const DENSITY_RADIUS = 8; // Tighter particle clusters for thinner strands
    const PHASE_SHIFT = 120; // Degrees between two strands
    let allPoints: THREE.Vector3[] = [];
    const pointTypes: string[] = []; // Track type: 'helix', 'connector-red', 'connector-green', 'connector-yellow'
    const connectionPoints: Array<{ pa: { x: number; y: number; z: number }; pb: { x: number; y: number; z: number } }> = [];
    let frameCount = 0; // For controlling random flicker rate
    const sphereTypeMap: { [key: number]: string } = {}; // Maps sphere index to type

    // Helper functions
    const rad = (deg: number) => (deg / 180) * Math.PI;
    const getRandomPoint = () => DENSITY_RADIUS * Math.random() - DENSITY_RADIUS / 2;
    const range = (x: number) => Array(x).fill(0).map((_, index) => index);
    const norm = (val: number, min: number, max: number) => (val - min) / (max - min);
    const lerp = (nrm: number, min: number, max: number) => (max - min) * nrm + min;
    const lerpMap = (val: number, sMin: number, sMax: number, dMin: number, dMax: number) =>
      lerp(norm(val, sMin, sMax), dMin, dMax);

    // Scene setup with transparent background
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = 2200; // Moved further back to see much longer DNA helix
    camera.position.y = 0;

    // Renderer setup with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(width, height);

    // Create ASCII Effect with coding/tech character set - "MY DNA CODES" theme
    const effect = new AsciiEffect(renderer, " .,;:!|<>/\\(){}[]=+-*&%$#@", {
      resolution: 0.10, // Aggressively reduced for performance (50% fewer characters than 0.15)
      scale: 1,
      color: "#00D9FF", // Cyan/turquoise color to match reference image
      secondaryColor: "#00FF94", // Green accent color
      invert: false,
    });
    effect.setSize(width, height);
    effect.domElement.style.color = "#00D9FF"; // Cyan ASCII text
    effect.domElement.style.backgroundColor = "transparent";

    // Clear container and add effect
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(effect.domElement);

    // Create particle cloud around a point and track type (optimized to 12 for performance)
    const getPoints = (p: { x: number; y: number; z: number }, type: string) => {
      const { x, y, z } = p;
      const points = range(12).map(() => new THREE.Vector3(
        x + getRandomPoint(),
        y + getRandomPoint(),
        z + getRandomPoint()
      ));

      // Track type for each point
      points.forEach(() => pointTypes.push(type));

      return points;
    };

    // Get circular points for helix
    const getCirclePoints = (a: number) => {
      const angle = rad(a);
      const r = 100; // Helix radius
      const x = r * sin(angle);
      const z = r * cos(angle);
      return { x, z };
    };

    // Add connection between two points with particle density (optimized to 25 for performance)
    const addConnection = ({ pa, pb }: { pa: { x: number; y: number; z: number }; pb: { x: number; y: number; z: number } }, connectorType: string) => {
      const connectionDensity = 25;
      const connectionParticles = range(connectionDensity).reduce<THREE.Vector3[]>(
        (acc, i) => [
          ...acc,
          ...getPoints({
            x: lerpMap(i, 0, connectionDensity, pa.x, pb.x),
            y: pa.y,
            z: lerpMap(i, 0, connectionDensity, pa.z, pb.z),
          }, connectorType),
        ],
        []
      );
      allPoints = allPoints.concat(connectionParticles);
    };

    // Calculate all DNA points - optimized to 600 for performance
    const calculateDnaPoints = () => {
      range(600).forEach((a) => {
        // First strand - adjusted Y multiplier for optimized helix
        const pa = { ...getCirclePoints(a), y: 4.0 * (a - 300) };
        // Second strand with phase shift
        const pb = { ...getCirclePoints(a + PHASE_SHIFT), y: 4.0 * (a - 300) };

        // Add particle clouds for both strands - marked as 'helix'
        allPoints = allPoints.concat(getPoints(pa, 'helix'));
        allPoints = allPoints.concat(getPoints(pb, 'helix'));

        // Add base pair connections every 36 degrees
        if (a % 36 === 0) {
          connectionPoints.push({ pa, pb });
        }
      });

      // Create connections with random colors (red, green, or yellow)
      connectionPoints.forEach((conn) => {
        const rand = Math.random();
        const connectorType =
          rand < 0.33 ? 'connector-red' :
          rand < 0.66 ? 'connector-green' :
                        'connector-yellow';
        addConnection(conn, connectorType);
      });
    };

    // Generate DNA structure
    calculateDnaPoints();

    // Create instanced mesh for performance with proper lighting
    const sphereGeometry = new THREE.SphereGeometry(5, 8, 8); // Increased from 3.5 for better visibility
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x00D9FF, // Cyan color to match reference
      shininess: 30, // Lower shininess for less uniform highlights
      transparent: false,
    });

    const instancedMesh = new THREE.InstancedMesh(
      sphereGeometry,
      sphereMaterial,
      allPoints.length
    );

    // Position each instance at the calculated DNA points with random size variation
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const tempColor = new THREE.Color();

    let sphereCount = 0;
    allPoints.forEach((point, index) => {
      // Skip 30% of spheres randomly (reduced from 40% for more density)
      if (Math.random() < 0.3) return;

      // Random scale between 0.4 and 2.0 for more variety
      const randomScale = 0.4 + Math.random() * 1.6;
      scale.set(randomScale, randomScale, randomScale);

      position.set(point.x, point.y, point.z);
      rotation.set(0, 0, 0, 1);

      matrix.compose(position, rotation, scale);
      instancedMesh.setMatrixAt(sphereCount, matrix);

      // Stratified initial brightness for character variety
      const rand = Math.random();
      const brightness =
        rand < 0.25 ? Math.random() * 0.25 :        // 25%: very light
        rand < 0.50 ? 0.25 + Math.random() * 0.25 : // 25%: light-medium
        rand < 0.75 ? 0.50 + Math.random() * 0.25 : // 25%: medium-dark
                      0.75 + Math.random() * 0.25;  // 25%: very dark

      // Get sphere type and map it for animation
      const type = pointTypes[index];
      sphereTypeMap[sphereCount] = type;

      // Color based on type: CYAN for helix, GREEN variations for connectors
      if (type === 'helix') {
        // CYAN/TURQUOISE for helix strands (matching reference image)
        tempColor.setRGB(
          brightness * 0.0,   // No red
          brightness * 0.85,  // High green
          brightness          // Full blue → CYAN tint
        );
      } else if (type === 'connector-red') {
        // Bright GREEN connectors (no red in this theme)
        tempColor.setRGB(brightness * 0.0, brightness, brightness * 0.6);
      } else if (type === 'connector-green') {
        // LIME GREEN connectors
        tempColor.setRGB(brightness * 0.4, brightness, brightness * 0.3);
      } else {
        // CYAN-GREEN connectors
        tempColor.setRGB(brightness * 0.1, brightness * 0.9, brightness * 0.9);
      }

      instancedMesh.setColorAt(sphereCount, tempColor);

      sphereCount++;
    });
    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.instanceColor!.needsUpdate = true;

    scene.add(instancedMesh);

    // Minimal lighting to let random brightness dominate
    const ambientLight = new THREE.AmbientLight(0x404040, 0.1); // Very low for random brightness to show
    scene.add(ambientLight);

    // Key light from top-right - minimal
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 0);
    pointLight1.position.set(400, 400, 400);
    scene.add(pointLight1);

    // Fill light from bottom-left - minimal
    const pointLight2 = new THREE.PointLight(0xffffff, 0.3, 0);
    pointLight2.position.set(-300, -300, 300);
    scene.add(pointLight2);

    // Subtle back light for rim lighting effect
    const pointLight3 = new THREE.PointLight(0xff8855, 0.2, 0);
    pointLight3.position.set(0, 0, -400);
    scene.add(pointLight3);

    // Mouse interaction - attach to the effect's DOM element
    const handleMouseMove = (event: MouseEvent) => {
      const rect = effect.domElement.getBoundingClientRect();
      if (!rect) return;

      // Normalize mouse position to -1 to 1
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => {
      // Reset on enter for smooth transition
    };

    const handleMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    effect.domElement.addEventListener("mousemove", handleMouseMove);
    effect.domElement.addEventListener("mouseenter", handleMouseEnter);
    effect.domElement.addEventListener("mouseleave", handleMouseLeave);
    effect.domElement.style.pointerEvents = "auto"; // Ensure mouse events work

    // Animation loop with random character flickering
    let animationFrameId: number;
    // Reuse Color object to avoid creating new objects every frame
    const color = new THREE.Color();
    // Frame rate throttling to 30 FPS for better performance
    let lastFrameTime = 0;
    const targetFrameTime = 1000 / 30; // 33.33ms per frame for 30 FPS

    const animate = (currentTime: number = 0) => {
      animationFrameId = requestAnimationFrame(animate);

      // Throttle to 30 FPS
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < targetFrameTime) {
        return; // Skip this frame
      }
      lastFrameTime = currentTime - (deltaTime % targetFrameTime);

      frameCount++;

      // Random character flickering - update every 10 frames (optimized from 3)
      if (frameCount % 10 === 0) {
        let colorsUpdated = false;

        for (let i = 0; i < sphereCount; i++) {
          // 15% chance to update this sphere (optimized from 40%)
          if (Math.random() < 0.15) {
            colorsUpdated = true;
            // Stratified random brightness for guaranteed character variety
            const rand = Math.random();
            const brightness =
              rand < 0.25 ? Math.random() * 0.25 :        // 25%: very light → . , ; :
              rand < 0.50 ? 0.25 + Math.random() * 0.25 : // 25%: light-medium → ! | < >
              rand < 0.75 ? 0.50 + Math.random() * 0.25 : // 25%: medium-dark → / \ ( ) { } [ ]
                            0.75 + Math.random() * 0.25;  // 25%: very dark → = + - * & % $ # @

            // Get sphere type to maintain color scheme
            const type = sphereTypeMap[i];

            // Color based on type: CYAN for helix, GREEN variations for connectors
            if (type === 'helix') {
              // CYAN/TURQUOISE for helix strands (matching reference image)
              color.setRGB(brightness * 0.0, brightness * 0.85, brightness);
            } else if (type === 'connector-red') {
              // Bright GREEN connectors
              color.setRGB(brightness * 0.0, brightness, brightness * 0.6);
            } else if (type === 'connector-green') {
              // LIME GREEN connectors
              color.setRGB(brightness * 0.4, brightness, brightness * 0.3);
            } else {
              // CYAN-GREEN connectors
              color.setRGB(brightness * 0.1, brightness * 0.9, brightness * 0.9);
            }

            instancedMesh.setColorAt(i, color);
          }
        }

        // Only update GPU buffer if colors actually changed
        if (colorsUpdated) {
          instancedMesh.instanceColor!.needsUpdate = true;
        }
      }

      // Base rotation speed
      let rotationSpeed = 0.01;

      // Interactive rotation based on mouse position
      // X-axis mouse movement controls rotation speed
      rotationSpeed += mouseRef.current.x * 0.02;

      // Y-axis mouse movement tilts the DNA
      const targetRotationX = mouseRef.current.y * 0.8;
      instancedMesh.rotation.x += (targetRotationX - instancedMesh.rotation.x) * 0.1;

      instancedMesh.rotation.y += rotationSpeed;

      effect.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      effect.domElement.removeEventListener("mousemove", handleMouseMove);
      effect.domElement.removeEventListener("mouseenter", handleMouseEnter);
      effect.domElement.removeEventListener("mouseleave", handleMouseLeave);

      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}

export default AsciiDnaHelix;
