import React, { useState, useEffect } from "react";
import { registerRootComponent } from "expo";
import styles from "./home.style";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import "./home.css";

import {
  Platform,
  PixelRatio,
  Dimensions,
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useColorScheme } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import ApplyScreen from "../apply/Apply.js";
import LegalScreen from "../legal/Legal.js";
import LoginScreen from "../login/Login.js";
import DashboardScreen from "../../chefPages/Sidebar";
import Footer from "../../components/Footer";

import DeliveryApplicationScreen from "../../chefPages/productSettings/deliveryApplication";
import StoreDesignScreen from "../../chefPages/storeDesign/storeDesign";
import StoreFront from "../../customerPages/storeFront/storeFront";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";
import MenuDetailsScreen from "../../chefPages/menu/menuDetails";
import { LinearGradient } from "expo-linear-gradient";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Escape your 9-5 desk job.",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "End your commute.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Get paid for cooking.",
  },
  {
    id: "3ac68afc-c605-483-a4f8-fbd91aa97f63",
    title: "Do what you love.",
  },
];

function getPixelRatio() {
  return PixelRatio.get() <= 2;
}

const scale = windowWidth / 450;

function getRandomInt() {
  const max = windowWidth / 10;
  return Math.floor(Math.random() * (max - 50 + 1) + 50);
}

var db = firebase.firestore();

const stackOption = () => ({
  headerShown: false,
});

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const phoneMaxWidth = 575.98;

var unsubscribe;

const chefImages = [
  {
    image: require("../../assets/img/chef.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
  {
    image: require("../../assets/img/chef1.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
  {
    image: require("../../assets/img/chef3.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
  {
    image: require("../../assets/img/chef4.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
];

const CustomDefaultTheme = {
  colors: {
    ...DefaultTheme.colors,
    background: "#f6f8fa",
    bgSecondary: "white",
    bgTertiary: "#FAFBFC",
    bgCanvas: "white",

    // Inputs
    inputBg: "white",
    inputBorder: "#e1e4e8",
    inputTextColor: "black",

    // Texts
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textTertiary: "#6a737d",
    textPlaceholder: "#6a737d",
    textDisabled: "#6a737d",
    textInverse: "white",
    textLink: "#0366d6",
    textDanger: "#cb2431",
    textSuccess: "#22863a",
    textWarning: "#b08800",
    textWhite: "#fff",

    // Borders
    borderPrimary: "#e1e4e8",
    borderSecondary: "#eaecef",
    borderTertiary: "#d1d5da",
    borderOverlay: "#e1e4e8",
    borderInverse: "#fff",
    borderInfo: "#0366d6",
    borderDanger: "#d73a49",
    borderSuccess: "#34d058",
    borderWarning: "#f9c513",

    // Btn
    btnText: "#24292e",
    btnBg: "#fafbfc",
    btnBorder: "rgba(27,31,35,0.15)",
    btnShadow: "0 1px 0 rgba(27,31,35,0.04)",
    btnInsetShadow: "0 1px 0 hsla(0,0%,100%,0.25)",
    btnHoverBg: "#f3f4f6",
    btnHoverBorder: "rgba(27,31,35,0.15)",
    btnSelectedBg: "#edeff2",
    btnFocusBg: "#fafbfc",
    btnFocusBorder: "rgba(27,31,35,0.15)",
    btnFocusShadow: "0 0 0 3px rgba(3,102,214,0.3)",
    btnPrimaryText: "white",
    btnPrimaryBg: "#2ea44f",
    btnPrimaryBorder: "rgba(27,31,35,0.15)",
    btnPrimaryShadow: "0 1px 0 rgba(27,31,35,0.1)",
    btnPrimarySnsetShadow: " 0 1px 0 hsla(0,0%,100%,0.03)",

    deletionText: "#cb2431",
    deletionBg: "#ffeef0",
    deletionBorder: "#d73a49",

    // Borders
    colorAutoGray0: "#fafbfc",
    colorAutoGray1: "#f6f8fa",
    colorAutoGray2: "#e1e4e8",
    colorAutoGray3: "#d1d5da",
    colorAutoGray4: "#959da5",
    colorAutoGray5: "#6a737d",
    colorAutoGray6: "#586069",
    colorAutoGray7: "#444d56",
    colorAutoGray8: "#2f363d",
    colorAutoGray9: "#24292e",
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,

    background: "#0d1117",
    bgSecondary: "#0d1117",
    bgTertiary: "#21262d",
    bgCanvas: "#0d1117",
    card: "rgb(255, 255, 255)",
    notification: "rgb(255, 69, 58)",

    // Texts
    textPrimary: "#C9D1D9",
    textSecondary: "#8b949e",
    textTertiary: "#8b949e",

    textLink: "#58a6ff",
    textDanger: "#f85149",
    textSuccess: "#56d364",
    colorTextWarning: "#e3b341",
    textWhite: "#f0f6fc",

    // Inputs
    inputBg: "#0d1117",
    inputBorder: "#21262d",
    inputTextColor: "white",

    // Primary btn
    btnPrimaryBg: "#238636",
    btnPrimaryBorder: "#2ea043",
    btnBg: "#21262d",

    // Border
    borderPrimary: "#30363d",

    // Grays
    colorAutoGray0: "#fafbfc",
    colorAutoGray1: "#f6f8fa",
    colorAutoGray2: "#e1e4e8",
    colorAutoGray3: "#d1d5da",
    colorAutoGray4: "#959da5",
    colorAutoGray5: "#6a737d",
    colorAutoGray6: "#586069",
    colorAutoGray7: "#444d56",
    colorAutoGray8: "#2f363d",
    colorAutoGray9: "#24292e",
  },
};

const FeaturesItem = ({ image, title, description }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
      width: getPixelRatio() ? windowWidth / 4 : windowWidth / 3,
      height: getPixelRatio() ? windowWidth / 4 : windowWidth / 3,
      backgroundColor: "#F5F5F7",
    }}
  >
    <Text
      style={{
        textAlignVertical: "center",
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "500",
        fontSize: windowWidth < phoneMaxWidth ? 17 : 24,
      }}
    >
      {title}
    </Text>
  </View>
);

function HomeScreen(props) {
  const { colors } = useTheme();
  const navigation = props.navigation;

  useEffect(() => {
    // code to run after render goes here
    /*
     *   Stripe WebGl Gradient Animation
     *   All Credits to Stripe.com
     *   ScrollObserver functionality to disable animation when not scrolled into view has been disabled and
     *   commented out for now.
     *   https://kevinhufnagl.com
     */

    //Converting colors to proper format
    function normalizeColor(hexCode) {
      return [
        ((hexCode >> 16) & 255) / 255,
        ((hexCode >> 8) & 255) / 255,
        (255 & hexCode) / 255,
      ];
    }
    ["SCREEN", "LINEAR_LIGHT"].reduce(
      (hexCode, t, n) =>
        Object.assign(hexCode, {
          [t]: n,
        }),
      {}
    );

    //Essential functionality of WebGl
    //t = width
    //n = height
    class MiniGl {
      constructor(canvas, width, height, debug = false) {
        const _miniGl = this,
          debug_output =
            -1 !==
            document.location.search.toLowerCase().indexOf("debug=webgl");
        (_miniGl.canvas = canvas),
          (_miniGl.gl = _miniGl.canvas.getContext("webgl", {
            antialias: true,
          })),
          (_miniGl.meshes = []);
        const context = _miniGl.gl;
        width && height && this.setSize(width, height),
          _miniGl.lastDebugMsg,
          (_miniGl.debug =
            debug && debug_output
              ? function (e) {
                  const t = new Date();
                  t - _miniGl.lastDebugMsg > 1e3 && console.log("---"),
                    console.log(
                      t.toLocaleTimeString() +
                        Array(Math.max(0, 32 - e.length)).join(" ") +
                        e +
                        ": ",
                      ...Array.from(arguments).slice(1)
                    ),
                    (_miniGl.lastDebugMsg = t);
                }
              : () => {}),
          Object.defineProperties(_miniGl, {
            Material: {
              enumerable: false,
              value: class {
                constructor(vertexShaders, fragments, uniforms = {}) {
                  const material = this;
                  function getShaderByType(type, source) {
                    const shader = context.createShader(type);
                    return (
                      context.shaderSource(shader, source),
                      context.compileShader(shader),
                      context.getShaderParameter(
                        shader,
                        context.COMPILE_STATUS
                      ) || console.error(context.getShaderInfoLog(shader)),
                      _miniGl.debug("Material.compileShaderSource", {
                        source: source,
                      }),
                      shader
                    );
                  }
                  function getUniformVariableDeclarations(uniforms, type) {
                    return Object.entries(uniforms)
                      .map(([uniform, value]) =>
                        value.getDeclaration(uniform, type)
                      )
                      .join("\n");
                  }
                  (material.uniforms = uniforms),
                    (material.uniformInstances = []);

                  const prefix =
                    "\n              precision highp float;\n            ";
                  (material.vertexSource = `\n              ${prefix}\n              attribute vec4 position;\n              attribute vec2 uv;\n              attribute vec2 uvNorm;\n              ${getUniformVariableDeclarations(
                    _miniGl.commonUniforms,
                    "vertex"
                  )}\n              ${getUniformVariableDeclarations(
                    uniforms,
                    "vertex"
                  )}\n              ${vertexShaders}\n            `),
                    (material.Source = `\n              ${prefix}\n              ${getUniformVariableDeclarations(
                      _miniGl.commonUniforms,
                      "fragment"
                    )}\n              ${getUniformVariableDeclarations(
                      uniforms,
                      "fragment"
                    )}\n              ${fragments}\n            `),
                    (material.vertexShader = getShaderByType(
                      context.VERTEX_SHADER,
                      material.vertexSource
                    )),
                    (material.fragmentShader = getShaderByType(
                      context.FRAGMENT_SHADER,
                      material.Source
                    )),
                    (material.program = context.createProgram()),
                    context.attachShader(
                      material.program,
                      material.vertexShader
                    ),
                    context.attachShader(
                      material.program,
                      material.fragmentShader
                    ),
                    context.linkProgram(material.program),
                    context.getProgramParameter(
                      material.program,
                      context.LINK_STATUS
                    ) ||
                      console.error(
                        context.getProgramInfoLog(material.program)
                      ),
                    context.useProgram(material.program),
                    material.attachUniforms(void 0, _miniGl.commonUniforms),
                    material.attachUniforms(void 0, material.uniforms);
                }
                //t = uniform
                attachUniforms(name, uniforms) {
                  //n  = material
                  const material = this;
                  void 0 === name
                    ? Object.entries(uniforms).forEach(([name, uniform]) => {
                        material.attachUniforms(name, uniform);
                      })
                    : "array" == uniforms.type
                    ? uniforms.value.forEach((uniform, i) =>
                        material.attachUniforms(`${name}[${i}]`, uniform)
                      )
                    : "struct" == uniforms.type
                    ? Object.entries(uniforms.value).forEach(([uniform, i]) =>
                        material.attachUniforms(`${name}.${uniform}`, i)
                      )
                    : (_miniGl.debug("Material.attachUniforms", {
                        name: name,
                        uniform: uniforms,
                      }),
                      material.uniformInstances.push({
                        uniform: uniforms,
                        location: context.getUniformLocation(
                          material.program,
                          name
                        ),
                      }));
                }
              },
            },
            Uniform: {
              enumerable: !1,
              value: class {
                constructor(e) {
                  (this.type = "float"), Object.assign(this, e);
                  (this.typeFn =
                    {
                      float: "1f",
                      int: "1i",
                      vec2: "2fv",
                      vec3: "3fv",
                      vec4: "4fv",
                      mat4: "Matrix4fv",
                    }[this.type] || "1f"),
                    this.update();
                }
                update(value) {
                  void 0 !== this.value &&
                    context[`uniform${this.typeFn}`](
                      value,
                      0 === this.typeFn.indexOf("Matrix")
                        ? this.transpose
                        : this.value,
                      0 === this.typeFn.indexOf("Matrix") ? this.value : null
                    );
                }
                //e - name
                //t - type
                //n - length
                getDeclaration(name, type, length) {
                  const uniform = this;
                  if (uniform.excludeFrom !== type) {
                    if ("array" === uniform.type)
                      return (
                        uniform.value[0].getDeclaration(
                          name,
                          type,
                          uniform.value.length
                        ) +
                        `\nconst int ${name}_length = ${uniform.value.length};`
                      );
                    if ("struct" === uniform.type) {
                      let name_no_prefix = name.replace("u_", "");
                      return (
                        (name_no_prefix =
                          name_no_prefix.charAt(0).toUpperCase() +
                          name_no_prefix.slice(1)),
                        `uniform struct ${name_no_prefix} 
                              {\n` +
                          Object.entries(uniform.value)
                            .map(([name, uniform]) =>
                              uniform
                                .getDeclaration(name, type)
                                .replace(/^uniform/, "")
                            )
                            .join("") +
                          `\n} ${name}${length > 0 ? `[${length}]` : ""};`
                      );
                    }
                    return `uniform ${uniform.type} ${name}${
                      length > 0 ? `[${length}]` : ""
                    };`;
                  }
                }
              },
            },
            PlaneGeometry: {
              enumerable: !1,
              value: class {
                constructor(width, height, n, i, orientation) {
                  context.createBuffer(),
                    (this.attributes = {
                      position: new _miniGl.Attribute({
                        target: context.ARRAY_BUFFER,
                        size: 3,
                      }),
                      uv: new _miniGl.Attribute({
                        target: context.ARRAY_BUFFER,
                        size: 2,
                      }),
                      uvNorm: new _miniGl.Attribute({
                        target: context.ARRAY_BUFFER,
                        size: 2,
                      }),
                      index: new _miniGl.Attribute({
                        target: context.ELEMENT_ARRAY_BUFFER,
                        size: 3,
                        type: context.UNSIGNED_SHORT,
                      }),
                    }),
                    this.setTopology(n, i),
                    this.setSize(width, height, orientation);
                }
                setTopology(e = 1, t = 1) {
                  const n = this;
                  (n.xSegCount = e),
                    (n.ySegCount = t),
                    (n.vertexCount = (n.xSegCount + 1) * (n.ySegCount + 1)),
                    (n.quadCount = n.xSegCount * n.ySegCount * 2),
                    (n.attributes.uv.values = new Float32Array(
                      2 * n.vertexCount
                    )),
                    (n.attributes.uvNorm.values = new Float32Array(
                      2 * n.vertexCount
                    )),
                    (n.attributes.index.values = new Uint16Array(
                      3 * n.quadCount
                    ));
                  for (let e = 0; e <= n.ySegCount; e++)
                    for (let t = 0; t <= n.xSegCount; t++) {
                      const i = e * (n.xSegCount + 1) + t;
                      if (
                        ((n.attributes.uv.values[2 * i] = t / n.xSegCount),
                        (n.attributes.uv.values[2 * i + 1] =
                          1 - e / n.ySegCount),
                        (n.attributes.uvNorm.values[2 * i] =
                          (t / n.xSegCount) * 2 - 1),
                        (n.attributes.uvNorm.values[2 * i + 1] =
                          1 - (e / n.ySegCount) * 2),
                        t < n.xSegCount && e < n.ySegCount)
                      ) {
                        const s = e * n.xSegCount + t;
                        (n.attributes.index.values[6 * s] = i),
                          (n.attributes.index.values[6 * s + 1] =
                            i + 1 + n.xSegCount),
                          (n.attributes.index.values[6 * s + 2] = i + 1),
                          (n.attributes.index.values[6 * s + 3] = i + 1),
                          (n.attributes.index.values[6 * s + 4] =
                            i + 1 + n.xSegCount),
                          (n.attributes.index.values[6 * s + 5] =
                            i + 2 + n.xSegCount);
                      }
                    }
                  n.attributes.uv.update(),
                    n.attributes.uvNorm.update(),
                    n.attributes.index.update(),
                    _miniGl.debug("Geometry.setTopology", {
                      uv: n.attributes.uv,
                      uvNorm: n.attributes.uvNorm,
                      index: n.attributes.index,
                    });
                }
                setSize(width = 1, height = 1, orientation = "xz") {
                  const geometry = this;
                  (geometry.width = width),
                    (geometry.height = height),
                    (geometry.orientation = orientation),
                    (geometry.attributes.position.values &&
                      geometry.attributes.position.values.length ===
                        3 * geometry.vertexCount) ||
                      (geometry.attributes.position.values = new Float32Array(
                        3 * geometry.vertexCount
                      ));
                  const o = width / -2,
                    r = height / -2,
                    segment_width = width / geometry.xSegCount,
                    segment_height = height / geometry.ySegCount;
                  for (let yIndex = 0; yIndex <= geometry.ySegCount; yIndex++) {
                    const t = r + yIndex * segment_height;
                    for (
                      let xIndex = 0;
                      xIndex <= geometry.xSegCount;
                      xIndex++
                    ) {
                      const r = o + xIndex * segment_width,
                        l = yIndex * (geometry.xSegCount + 1) + xIndex;
                      (geometry.attributes.position.values[
                        3 * l + "xyz".indexOf(orientation[0])
                      ] = r),
                        (geometry.attributes.position.values[
                          3 * l + "xyz".indexOf(orientation[1])
                        ] = -t);
                    }
                  }
                  geometry.attributes.position.update(),
                    _miniGl.debug("Geometry.setSize", {
                      position: geometry.attributes.position,
                    });
                }
              },
            },
            Mesh: {
              enumerable: !1,
              value: class {
                constructor(geometry, material) {
                  const mesh = this;
                  (mesh.geometry = geometry),
                    (mesh.material = material),
                    (mesh.wireframe = !1),
                    (mesh.attributeInstances = []),
                    Object.entries(mesh.geometry.attributes).forEach(
                      ([e, attribute]) => {
                        mesh.attributeInstances.push({
                          attribute: attribute,
                          location: attribute.attach(e, mesh.material.program),
                        });
                      }
                    ),
                    _miniGl.meshes.push(mesh),
                    _miniGl.debug("Mesh.constructor", {
                      mesh: mesh,
                    });
                }
                draw() {
                  context.useProgram(this.material.program),
                    this.material.uniformInstances.forEach(
                      ({ uniform: e, location: t }) => e.update(t)
                    ),
                    this.attributeInstances.forEach(
                      ({ attribute: e, location: t }) => e.use(t)
                    ),
                    context.drawElements(
                      this.wireframe ? context.LINES : context.TRIANGLES,
                      this.geometry.attributes.index.values.length,
                      context.UNSIGNED_SHORT,
                      0
                    );
                }
                remove() {
                  _miniGl.meshes = _miniGl.meshes.filter((e) => e != this);
                }
              },
            },
            Attribute: {
              enumerable: !1,
              value: class {
                constructor(e) {
                  (this.type = context.FLOAT),
                    (this.normalized = !1),
                    (this.buffer = context.createBuffer()),
                    Object.assign(this, e),
                    this.update();
                }
                update() {
                  void 0 !== this.values &&
                    (context.bindBuffer(this.target, this.buffer),
                    context.bufferData(
                      this.target,
                      this.values,
                      context.STATIC_DRAW
                    ));
                }
                attach(e, t) {
                  const n = context.getAttribLocation(t, e);
                  return (
                    this.target === context.ARRAY_BUFFER &&
                      (context.enableVertexAttribArray(n),
                      context.vertexAttribPointer(
                        n,
                        this.size,
                        this.type,
                        this.normalized,
                        0,
                        0
                      )),
                    n
                  );
                }
                use(e) {
                  context.bindBuffer(this.target, this.buffer),
                    this.target === context.ARRAY_BUFFER &&
                      (context.enableVertexAttribArray(e),
                      context.vertexAttribPointer(
                        e,
                        this.size,
                        this.type,
                        this.normalized,
                        0,
                        0
                      ));
                }
              },
            },
          });
        const a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        _miniGl.commonUniforms = {
          projectionMatrix: new _miniGl.Uniform({
            type: "mat4",
            value: a,
          }),
          modelViewMatrix: new _miniGl.Uniform({
            type: "mat4",
            value: a,
          }),
          resolution: new _miniGl.Uniform({
            type: "vec2",
            value: [1, 1],
          }),
          aspectRatio: new _miniGl.Uniform({
            type: "float",
            value: 1,
          }),
        };
      }
      setSize(e = 640, t = 480) {
        (this.width = e),
          (this.height = t),
          (this.canvas.width = e),
          (this.canvas.height = t),
          this.gl.viewport(0, 0, e, t),
          (this.commonUniforms.resolution.value = [e, t]),
          (this.commonUniforms.aspectRatio.value = e / t),
          this.debug("MiniGL.setSize", {
            width: e,
            height: t,
          });
      }
      //left, right, top, bottom, near, far
      setOrthographicCamera(e = 0, t = 0, n = 0, i = -2e3, s = 2e3) {
        (this.commonUniforms.projectionMatrix.value = [
          2 / this.width,
          0,
          0,
          0,
          0,
          2 / this.height,
          0,
          0,
          0,
          0,
          2 / (i - s),
          0,
          e,
          t,
          n,
          1,
        ]),
          this.debug(
            "setOrthographicCamera",
            this.commonUniforms.projectionMatrix.value
          );
      }
      render() {
        this.gl.clearColor(0, 0, 0, 0),
          this.gl.clearDepth(1),
          this.meshes.forEach((e) => e.draw());
      }
    }

    //Sets initial properties
    function e(object, propertyName, val) {
      return (
        propertyName in object
          ? Object.defineProperty(object, propertyName, {
              value: val,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (object[propertyName] = val),
        object
      );
    }

    //Gradient object
    class Gradient {
      constructor(...t) {
        e(this, "el", void 0),
          e(this, "cssVarRetries", 0),
          e(this, "maxCssVarRetries", 200),
          e(this, "angle", 0),
          e(this, "isLoadedClass", !1),
          e(this, "isScrolling", !1),
          /*e(this, "isStatic", o.disableAmbientAnimations()),*/ e(
            this,
            "scrollingTimeout",
            void 0
          ),
          e(this, "scrollingRefreshDelay", 200),
          e(this, "isIntersecting", !1),
          e(this, "shaderFiles", void 0),
          e(this, "vertexShader", void 0),
          e(this, "sectionColors", void 0),
          e(this, "computedCanvasStyle", void 0),
          e(this, "conf", void 0),
          e(this, "uniforms", void 0),
          e(this, "t", 1253106),
          e(this, "last", 0),
          e(this, "width", void 0),
          e(this, "minWidth", 1111),
          e(this, "height", 600),
          e(this, "xSegCount", void 0),
          e(this, "ySegCount", void 0),
          e(this, "mesh", void 0),
          e(this, "material", void 0),
          e(this, "geometry", void 0),
          e(this, "minigl", void 0),
          e(this, "scrollObserver", void 0),
          e(this, "amp", 320),
          e(this, "seed", 5),
          e(this, "freqX", 14e-5),
          e(this, "freqY", 29e-5),
          e(this, "freqDelta", 1e-5),
          e(this, "activeColors", [1, 1, 1, 1]),
          e(this, "isMetaKey", !1),
          e(this, "isGradientLegendVisible", !1),
          e(this, "isMouseDown", !1),
          e(this, "handleScroll", () => {
            clearTimeout(this.scrollingTimeout),
              (this.scrollingTimeout = setTimeout(
                this.handleScrollEnd,
                this.scrollingRefreshDelay
              )),
              this.isGradientLegendVisible && this.hideGradientLegend(),
              this.conf.playing && ((this.isScrolling = !0), this.pause());
          }),
          e(this, "handleScrollEnd", () => {
            (this.isScrolling = !1), this.isIntersecting && this.play();
          }),
          e(this, "resize", () => {
            (this.width = window.innerWidth),
              this.minigl.setSize(this.width, this.height),
              this.minigl.setOrthographicCamera(),
              (this.xSegCount = Math.ceil(this.width * this.conf.density[0])),
              (this.ySegCount = Math.ceil(this.height * this.conf.density[1])),
              this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount),
              this.mesh.geometry.setSize(this.width, this.height),
              (this.mesh.material.uniforms.u_shadow_power.value =
                this.width < 600 ? 5 : 6);
          }),
          e(this, "handleMouseDown", (e) => {
            this.isGradientLegendVisible &&
              ((this.isMetaKey = e.metaKey),
              (this.isMouseDown = !0),
              !1 === this.conf.playing && requestAnimationFrame(this.animate));
          }),
          e(this, "handleMouseUp", () => {
            this.isMouseDown = !1;
          }),
          e(this, "animate", (e) => {
            if (!this.shouldSkipFrame(e) || this.isMouseDown) {
              if (
                ((this.t += Math.min(e - this.last, 1e3 / 15)),
                (this.last = e),
                this.isMouseDown)
              ) {
                let e = 160;
                this.isMetaKey && (e = -160), (this.t += e);
              }
              (this.mesh.material.uniforms.u_time.value = this.t),
                this.minigl.render();
            }
            if (0 !== this.last && this.isStatic)
              return this.minigl.render(), void this.disconnect();
            /*this.isIntersecting && */ (this.conf.playing ||
              this.isMouseDown) &&
              requestAnimationFrame(this.animate);
          }),
          e(this, "addIsLoadedClass", () => {
            /*this.isIntersecting && */ !this.isLoadedClass &&
              ((this.isLoadedClass = !0),
              this.el.classList.add("isLoaded"),
              setTimeout(() => {
                this.el.parentElement.classList.add("isLoaded");
              }, 3e3));
          }),
          e(this, "pause", () => {
            this.conf.playing = false;
          }),
          e(this, "play", () => {
            requestAnimationFrame(this.animate), (this.conf.playing = true);
          }),
          e(this, "initGradient", (selector) => {
            this.el = document.querySelector(selector);
            this.connect();
            return this;
          });
      }
      async connect() {
        (this.shaderFiles = {
          vertex:
            "varying vec3 v_color;\n\nvoid main() {\n  float time = u_time * u_global.noiseSpeed;\n\n  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;\n\n  vec2 st = 1. - uvNorm.xy;\n\n  //\n  // Tilting the plane\n  //\n\n  // Front-to-back tilt\n  float tilt = resolution.y / 2.0 * uvNorm.y;\n\n  // Left-to-right angle\n  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;\n\n  // Up-down shift to offset incline\n  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);\n\n  //\n  // Vertex noise\n  //\n\n  float noise = snoise(vec3(\n    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,\n    noiseCoord.y * u_vertDeform.noiseFreq.y,\n    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed\n  )) * u_vertDeform.noiseAmp;\n\n  // Fade noise to zero at edges\n  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);\n\n  // Clamp to 0\n  noise = max(0.0, noise);\n\n  vec3 pos = vec3(\n    position.x,\n    position.y + tilt + incline + noise - offset,\n    position.z\n  );\n\n  //\n  // Vertex color, to be passed to fragment shader\n  //\n\n  if (u_active_colors[0] == 1.) {\n    v_color = u_baseColor;\n  }\n\n  for (int i = 0; i < u_waveLayers_length; i++) {\n    if (u_active_colors[i + 1] == 1.) {\n      WaveLayers layer = u_waveLayers[i];\n\n      float noise = smoothstep(\n        layer.noiseFloor,\n        layer.noiseCeil,\n        snoise(vec3(\n          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,\n          noiseCoord.y * layer.noiseFreq.y,\n          time * layer.noiseSpeed + layer.noiseSeed\n        )) / 2.0 + 0.5\n      );\n\n      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));\n    }\n  }\n\n  //\n  // Finish\n  //\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}",
          noise:
            "//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n{\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}",
          blend:
            "//\n// https://github.com/jamieowen/glsl-blend\n//\n\n// Normal\n\nvec3 blendNormal(vec3 base, vec3 blend) {\n\treturn blend;\n}\n\nvec3 blendNormal(vec3 base, vec3 blend, float opacity) {\n\treturn (blendNormal(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Screen\n\nfloat blendScreen(float base, float blend) {\n\treturn 1.0-((1.0-base)*(1.0-blend));\n}\n\nvec3 blendScreen(vec3 base, vec3 blend) {\n\treturn vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));\n}\n\nvec3 blendScreen(vec3 base, vec3 blend, float opacity) {\n\treturn (blendScreen(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Multiply\n\nvec3 blendMultiply(vec3 base, vec3 blend) {\n\treturn base*blend;\n}\n\nvec3 blendMultiply(vec3 base, vec3 blend, float opacity) {\n\treturn (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Overlay\n\nfloat blendOverlay(float base, float blend) {\n\treturn base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));\n}\n\nvec3 blendOverlay(vec3 base, vec3 blend) {\n\treturn vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));\n}\n\nvec3 blendOverlay(vec3 base, vec3 blend, float opacity) {\n\treturn (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Hard light\n\nvec3 blendHardLight(vec3 base, vec3 blend) {\n\treturn blendOverlay(blend,base);\n}\n\nvec3 blendHardLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Soft light\n\nfloat blendSoftLight(float base, float blend) {\n\treturn (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));\n}\n\nvec3 blendSoftLight(vec3 base, vec3 blend) {\n\treturn vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));\n}\n\nvec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Color dodge\n\nfloat blendColorDodge(float base, float blend) {\n\treturn (blend==1.0)?blend:min(base/(1.0-blend),1.0);\n}\n\nvec3 blendColorDodge(vec3 base, vec3 blend) {\n\treturn vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));\n}\n\nvec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {\n\treturn (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Color burn\n\nfloat blendColorBurn(float base, float blend) {\n\treturn (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);\n}\n\nvec3 blendColorBurn(vec3 base, vec3 blend) {\n\treturn vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));\n}\n\nvec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {\n\treturn (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Vivid Light\n\nfloat blendVividLight(float base, float blend) {\n\treturn (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));\n}\n\nvec3 blendVividLight(vec3 base, vec3 blend) {\n\treturn vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));\n}\n\nvec3 blendVividLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Lighten\n\nfloat blendLighten(float base, float blend) {\n\treturn max(blend,base);\n}\n\nvec3 blendLighten(vec3 base, vec3 blend) {\n\treturn vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));\n}\n\nvec3 blendLighten(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLighten(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear burn\n\nfloat blendLinearBurn(float base, float blend) {\n\t// Note : Same implementation as BlendSubtractf\n\treturn max(base+blend-1.0,0.0);\n}\n\nvec3 blendLinearBurn(vec3 base, vec3 blend) {\n\t// Note : Same implementation as BlendSubtract\n\treturn max(base+blend-vec3(1.0),vec3(0.0));\n}\n\nvec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear dodge\n\nfloat blendLinearDodge(float base, float blend) {\n\t// Note : Same implementation as BlendAddf\n\treturn min(base+blend,1.0);\n}\n\nvec3 blendLinearDodge(vec3 base, vec3 blend) {\n\t// Note : Same implementation as BlendAdd\n\treturn min(base+blend,vec3(1.0));\n}\n\nvec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear light\n\nfloat blendLinearLight(float base, float blend) {\n\treturn blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));\n}\n\nvec3 blendLinearLight(vec3 base, vec3 blend) {\n\treturn vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));\n}\n\nvec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));\n}",
          fragment:
            "varying vec3 v_color;\n\nvoid main() {\n  vec3 color = v_color;\n  if (u_darken_top == 1.0) {\n    vec2 st = gl_FragCoord.xy/resolution.xy;\n    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;\n  }\n  gl_FragColor = vec4(color, 1.0);\n}",
        }),
          (this.conf = {
            presetName: "",
            wireframe: false,
            density: [0.06, 0.16],
            zoom: 1,
            rotation: 0,
            playing: true,
          }),
          document.querySelectorAll("canvas").length < 1
            ? console.log("DID NOT LOAD HERO STRIPE CANVAS")
            : ((this.minigl = new MiniGl(this.el, null, null, !0)),
              requestAnimationFrame(() => {
                this.el &&
                  ((this.computedCanvasStyle = getComputedStyle(this.el)),
                  this.waitForCssVars());
              }));
        /*
      this.scrollObserver = await s.create(.1, !1),
      this.scrollObserver.observe(this.el),
      this.scrollObserver.onSeparate(() => {
          window.removeEventListener("scroll", this.handleScroll), window.removeEventListener("mousedown", this.handleMouseDown), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("keydown", this.handleKeyDown), this.isIntersecting = !1, this.conf.playing && this.pause()
      }), 
      this.scrollObserver.onIntersect(() => {
          window.addEventListener("scroll", this.handleScroll), window.addEventListener("mousedown", this.handleMouseDown), window.addEventListener("mouseup", this.handleMouseUp), window.addEventListener("keydown", this.handleKeyDown), this.isIntersecting = !0, this.addIsLoadedClass(), this.play()
      })*/
      }
      disconnect() {
        this.scrollObserver &&
          (window.removeEventListener("scroll", this.handleScroll),
          window.removeEventListener("mousedown", this.handleMouseDown),
          window.removeEventListener("mouseup", this.handleMouseUp),
          window.removeEventListener("keydown", this.handleKeyDown),
          this.scrollObserver.disconnect()),
          window.removeEventListener("resize", this.resize);
      }
      initMaterial() {
        this.uniforms = {
          u_time: new this.minigl.Uniform({
            value: 0,
          }),
          u_shadow_power: new this.minigl.Uniform({
            value: 5,
          }),
          u_darken_top: new this.minigl.Uniform({
            value: "" === this.el.dataset.jsDarkenTop ? 1 : 0,
          }),
          u_active_colors: new this.minigl.Uniform({
            value: this.activeColors,
            type: "vec4",
          }),
          u_global: new this.minigl.Uniform({
            value: {
              noiseFreq: new this.minigl.Uniform({
                value: [this.freqX, this.freqY],
                type: "vec2",
              }),
              noiseSpeed: new this.minigl.Uniform({
                value: 5e-6,
              }),
            },
            type: "struct",
          }),
          u_vertDeform: new this.minigl.Uniform({
            value: {
              incline: new this.minigl.Uniform({
                value: Math.sin(this.angle) / Math.cos(this.angle),
              }),
              offsetTop: new this.minigl.Uniform({
                value: -0.5,
              }),
              offsetBottom: new this.minigl.Uniform({
                value: -0.5,
              }),
              noiseFreq: new this.minigl.Uniform({
                value: [3, 4],
                type: "vec2",
              }),
              noiseAmp: new this.minigl.Uniform({
                value: this.amp,
              }),
              noiseSpeed: new this.minigl.Uniform({
                value: 10,
              }),
              noiseFlow: new this.minigl.Uniform({
                value: 3,
              }),
              noiseSeed: new this.minigl.Uniform({
                value: this.seed,
              }),
            },
            type: "struct",
            excludeFrom: "fragment",
          }),
          u_baseColor: new this.minigl.Uniform({
            value: this.sectionColors[0],
            type: "vec3",
            excludeFrom: "fragment",
          }),
          u_waveLayers: new this.minigl.Uniform({
            value: [],
            excludeFrom: "fragment",
            type: "array",
          }),
        };
        for (let e = 1; e < this.sectionColors.length; e += 1)
          this.uniforms.u_waveLayers.value.push(
            new this.minigl.Uniform({
              value: {
                color: new this.minigl.Uniform({
                  value: this.sectionColors[e],
                  type: "vec3",
                }),
                noiseFreq: new this.minigl.Uniform({
                  value: [
                    2 + e / this.sectionColors.length,
                    3 + e / this.sectionColors.length,
                  ],
                  type: "vec2",
                }),
                noiseSpeed: new this.minigl.Uniform({
                  value: 11 + 0.3 * e,
                }),
                noiseFlow: new this.minigl.Uniform({
                  value: 6.5 + 0.3 * e,
                }),
                noiseSeed: new this.minigl.Uniform({
                  value: this.seed + 10 * e,
                }),
                noiseFloor: new this.minigl.Uniform({
                  value: 0.1,
                }),
                noiseCeil: new this.minigl.Uniform({
                  value: 0.63 + 0.07 * e,
                }),
              },
              type: "struct",
            })
          );
        return (
          (this.vertexShader = [
            this.shaderFiles.noise,
            this.shaderFiles.blend,
            this.shaderFiles.vertex,
          ].join("\n\n")),
          new this.minigl.Material(
            this.vertexShader,
            this.shaderFiles.fragment,
            this.uniforms
          )
        );
      }
      initMesh() {
        (this.material = this.initMaterial()),
          (this.geometry = new this.minigl.PlaneGeometry()),
          (this.mesh = new this.minigl.Mesh(this.geometry, this.material));
      }
      shouldSkipFrame(e) {
        return (
          !!window.document.hidden ||
          !this.conf.playing ||
          parseInt(e, 10) % 2 == 0 ||
          void 0
        );
      }
      updateFrequency(e) {
        (this.freqX += e), (this.freqY += e);
      }
      toggleColor(index) {
        this.activeColors[index] = 0 === this.activeColors[index] ? 1 : 0;
      }
      showGradientLegend() {
        this.width > this.minWidth &&
          ((this.isGradientLegendVisible = !0),
          document.body.classList.add("isGradientLegendVisible"));
      }
      hideGradientLegend() {
        (this.isGradientLegendVisible = !1),
          document.body.classList.remove("isGradientLegendVisible");
      }
      init() {
        this.initGradientColors(),
          this.initMesh(),
          this.resize(),
          requestAnimationFrame(this.animate),
          window.addEventListener("resize", this.resize);
      }
      /*
       * Waiting for the css variables to become available, usually on page load before we can continue.
       * Using default colors assigned below if no variables have been found after maxCssVarRetries
       */
      waitForCssVars() {
        if (
          this.computedCanvasStyle &&
          -1 !==
            this.computedCanvasStyle
              .getPropertyValue("--gradient-color-1")
              .indexOf("#")
        )
          this.init(), this.addIsLoadedClass();
        else {
          if (
            ((this.cssVarRetries += 1),
            this.cssVarRetries > this.maxCssVarRetries)
          ) {
            return (
              (this.sectionColors = [16711680, 16711680, 16711935, 65280, 255]),
              void this.init()
            );
          }
          requestAnimationFrame(() => this.waitForCssVars());
        }
      }
      /*
       * Initializes the four section colors by retrieving them from css variables.
       */
      initGradientColors() {
        this.sectionColors = [
          "--gradient-color-1",
          "--gradient-color-2",
          "--gradient-color-3",
          "--gradient-color-4",
        ]
          .map((cssPropertyName) => {
            let hex = this.computedCanvasStyle
              .getPropertyValue(cssPropertyName)
              .trim();
            //Check if shorthand hex value was used and double the length so the conversion in normalizeColor will work.
            if (4 === hex.length) {
              const hexTemp = hex
                .substr(1)
                .split("")
                .map((hexTemp) => hexTemp + hexTemp)
                .join("");
              hex = `#${hexTemp}`;
            }
            return hex && `0x${hex.substr(1)}`;
          })
          .filter(Boolean)
          .map(normalizeColor);
      }
    }

    /*
     *Finally initializing the Gradient class, assigning a canvas to it and calling Gradient.connect() which initializes everything,
     * Use Gradient.pause() and Gradient.play() for controls.
     *
     * Here are some default property values you can change anytime:
     * Amplitude:    Gradient.amp = 0
     * Colors:       Gradient.sectionColors (if you change colors, use normalizeColor(#hexValue)) before you assign it.
     *
     *
     * Useful functions
     * Gradient.toggleColor(index)
     * Gradient.updateFrequency(freq)
     */
    var gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []); // <-- empty array means 'run once'

  const renderFeaturesItem = ({ item }) => (
    <FeaturesItem
      image={item.image}
      title={item.title}
      description={item.description}
    />
  );

  return (
    <View style={styles.container}>
      <canvas id="gradient-canvas"></canvas>
      <View style={styles.secondaryView}>
        <View
          style={{
            padding: 16,
            paddingBottom: 40,
            marginTop: 20,
            width: "100%",
            height: "50%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              color: "white",
              width: "75%",
              fontSize: getPixelRatio() ? 40 : 25,
              fontWeight: "600",
            }}
          >
            Home cooks deserve to get paid doing what they love. Lidora makes it
            easy.
          </Text>

          <Text
            style={{
              marginTop: 20,
              width: "75%",
              color: "white",
              fontSize: getPixelRatio() ? 20 : 18,
            }}
          >
            Many chefs of all sizes, use Lidora software to deliver food to
            customers, accept payments and manage their kitchen online.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Apply")}
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "white",
              width: 90,
              height: 40,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}
          >
            <Text
              style={{ alignSelf: "center", fontSize: 12, fontWeight: "600" }}
            >
              Start Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Users section */}
      <View
        style={{
          marginTop: 20,
          height: 200,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        {chefImages.map((image) => (
          <Image
            style={{
              width: image.size,
              height: image.size,
              top: image.top,
              borderRadius: image.size / 2,
            }}
            source={image.image}
          />
        ))}
      </View>
      {/* Storefront section */}
      <View style={{ padding: 20, marginTop: getPixelRatio() ? 180 : 40 }}>
        <Text
          style={{
            marginBottom: 16,
            fontWeight: "600",
            fontSize: 17,
            color: colors.btnPrimaryBg,
          }}
        >
          A unified platform
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: getPixelRatio() ? "row" : "column",
            height: 400,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: getPixelRatio() ? "50%" : "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getPixelRatio() ? 40 : 20,
                width: "100%",
              }}
            >
              A fully integrated Store front for your customers
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontSize: getPixelRatio() ? 18 : 18,
              }}
            >
              We bring together everything that’s required to build a great
              custom Store Front for your customer, to accept payments, sell
              your food and everything in between.
            </Text>
          </View>

          {/* Phone Graphic */}
          <View
            style={{
              width: getPixelRatio() ? 264 : 164.94,
              height: getPixelRatio() ? 533 : 333,
              padding: 8,
              borderRadius: 20,
              backgroundColor: "#f6f9fc",
              boxShadow:
                "0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)",
            }}
          >
            <View></View>
            {/* End Phone Graphic */}
          </View>
          {/* <Image
            style={{
              backgroundColor: "gray",
              width: getPixelRatio() ? "50%" : "100%",
              height: getPixelRatio() ? "100%" : "50%",
            }}
            // source={require("../../assets/img/Kyoto.jpg")}
          /> */}
        </View>
      </View>
      {/* Delivery section */}
      <View style={{ padding: 20, marginTop: 40 }}>
        <View
          style={{
            width: "100%",
            flexDirection: getPixelRatio() ? "row" : "column",
            height: 400,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: getPixelRatio() ? "50%" : "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getPixelRatio() ? 40 : 20,
                width: "100%",
              }}
            >
              Lidora can also take care of delivery for you.
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontSize: getPixelRatio() ? 18 : 18,
              }}
            >
              We bring together everything that’s required to build a great
              custom Store Front for your customer, to accept payments and sell
              your food and everything in between.
            </Text>
          </View>

          {/* Phone Graphic */}
          <View
            style={{
              width: 164.94,
              height: 333,
              padding: 8,
              borderRadius: 20,
              backgroundColor: "#f6f9fc",
              boxShadow:
                "0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)",
            }}
          >
            <View></View>
            {/* End Phone Graphic */}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: getPixelRatio() ? 40 : 30,
            padding: 40,
          }}
        >
          Lidora makes it possible for you to
        </Text>
        <FlatList
          style={{ marginTop: 20, marginBottom: 100 }}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={renderFeaturesItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App(props) {
  const scheme = useColorScheme();
  const [userLoggedIn, setUserLoggedIn] = React.useState(null);
  const [userData, setUserData] = React.useState({ user: [], userID: "" });

  // Verify if user is logged in
  React.useEffect(() => {
    // Fetch Current chef
    const currentComponent = this;
    unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("chefs")
          .doc(user.uid)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setUserLoggedIn(true);
              setUserData({ user: doc.data(), userID: user.uid });
            } else {
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
        return;
      } else {
        // No user is signed in.
        setUserLoggedIn(false);
      }
    });
  }, []);

  let currentURL = window.location.href;
  let getChefandID = currentURL.split("?");
  let storeName = currentURL.split("=")[1];

  if (typeof getChefandID[1] != "undefined") {
    return <StoreFront storeName={storeName} />;
  } else {
    return (
      <NavigationContainer
        theme={scheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
      >
        <Stack.Navigator
          initialRouteName="Lidora"
          screenOptions={{
            headerMode: "none",
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Settings" component={SettingScreen} /> */}
          <Stack.Screen
            name="Lidora"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              headerTintColor: "#fff",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate(userLoggedIn ? "Dashboard" : "Login", {
                      navigation: navigation,
                      userData: userData,
                      userID: userData.userID,
                    });
                  }}
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "white",
                    marginRight: 16,
                    width: 90,
                    height: 40,
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    elevation: 7,
                  }}
                >
                  {userLoggedIn ? (
                    <Text style={{ alignSelf: "center", fontSize: 12 }}>
                      {"Dashboard"}
                      <Entypo
                        name="chevron-small-right"
                        size={12}
                        color="black"
                      />
                    </Text>
                  ) : (
                    <Text style={{ alignSelf: "center", fontSize: 14 }}>
                      {"Login"}
                    </Text>
                  )}
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            options={stackOption}
            name="Dashboard"
            component={DashboardScreen}
          />
          <Stack.Screen name="Apply" component={ApplyScreen} />
          <Stack.Screen name="Legal" component={LegalScreen} />
          <Stack.Screen
            options={stackOption}
            name="Menu Details"
            component={MenuDetailsScreen}
          />
          <Stack.Screen
            options={stackOption}
            name="Delivery Application"
            component={DeliveryApplicationScreen}
          />
          <Stack.Screen name="StoreDesign" component={StoreDesignScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default registerRootComponent(App);
