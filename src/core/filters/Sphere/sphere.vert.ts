const vertex = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}`;

export default vertex;

// // per-vertex lighting with a directional light source

// // vertex attributes
// attribute vec3 vertexPosition;
// attribute vec3 vertexNormal;
// attribute vec2 aVertexPosition;

// // uniforms
// uniform mat4 matrixNormal;
// uniform mat4 matrixView;
// uniform mat4 matrixModelView;
// uniform mat4 matrixModelViewProjection;
// uniform bool lightEnabled;
// uniform vec4 lightPosition;             // should be on the eye space
// uniform vec4 lightColor;
// uniform vec3 lightAttenuations;         // constant, linear, quadratic attanuations
// uniform vec4 materialAmbient;           // material ambient color
// uniform vec4 materialDiffuse;           // material diffuse color
// uniform vec4 materialSpecular;          // material specular color
// uniform float materialShininess;        // material specular exponent

// // varying variables
// varying vec4 ambient;
// varying vec4 diffuse;
// varying vec4 normalVec;
// varying vec3 lightVec;
// varying vec3 halfVec;
// varying float lightDistance;
// varying vec2 vTextureCoord;

// void main(void) {
//     // transform vertex position to clip space
//     gl_Position = matrixModelViewProjection * vec4(vertexPosition, 1);

//     if(!lightEnabled) {
//         diffuse = materialDiffuse;
//         return;
//     }

//     ambient = materialAmbient;
//     diffuse = materialDiffuse * lightColor;

//     // directional
//     if(lightPosition.w == 0.0) {
//         lightVec = lightPosition.xyz;   // assume lightPosition is normalized
//         lightDistance = -1.0;           // negative for directional
//     }
//     // positional
//     else {
//         // transform vertex pos to eye space
//         vec4 eyeVertexVec = matrixModelView * vec4(vertexPosition, 1.0);

//         // compute light vector and distance for positional
//         lightVec = lightPosition.xyz - eyeVertexVec.xyz;
//         lightDistance = sqrt(dot(lightVec, lightVec));
//         lightVec = normalize(lightVec);
//     }

//     // transform the normal vector from object space to eye space
//     // assume vertexNormal was already normalized.
//     normalVec = matrixNormal * vec4(vertexNormal, 1.0);

//     // compute half vector
//     halfVec = normalize(lightVec + vec3(0, 0, 1));

//     // pass texture coord
//     vTextureCoord = aVertexPosition;
// }
