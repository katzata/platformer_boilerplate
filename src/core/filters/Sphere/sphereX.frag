#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

// uniforms
uniform bool lightEnabled;
uniform vec4 lightColor;
uniform vec3 lightAttenuations;         // constant, linear, quadratic attanuations
uniform vec4 materialSpecular;          // material specular color
uniform float materialShininess;        // material specular exponent
uniform bool textureEnabled;
uniform sampler2D map0;

// varying variables
varying vec4 ambient;
varying vec4 diffuse;
varying vec4 normalVec;
varying vec3 lightVec;
varying vec3 halfVec;
varying float lightDistance;
varying vec2 texCoord0;

void main(void) {
    if(!lightEnabled) {
        if(textureEnabled)
            gl_FragColor = texture2D(map0, texCoord0) * diffuse;
        else
            gl_FragColor = diffuse;
        return;
    }

    // re-normalize varying vars and store them as local vars
    vec3 normal = normalize(normalVec.xyz);
    vec3 halfv = normalize(halfVec);
    vec3 light = normalize(lightVec);

    // compute attenuations for positional light
    float dotNL = max(dot(normal, light), 0.0);
    float dotNH = max(dot(normal, halfv), 0.0);
    //float dotNH = dot(normal, halfv);

    // compute attenuation factor: 1 / (k0 + k1 * d + k2 * (d*d))
    /*
    float attFactor = 1.0;
    attFactor = 1.0 / (lightAttenuations[0] +
                       lightAttenuations[1] * lightDistance +
                       lightAttenuations[2] * lightDistance * lightDistance);
    */

    // start with ambient
    vec3 color = ambient.xyz;

    // add diffuse
    color += dotNL * diffuse.xyz;

    // apply texturing before specular
    if(textureEnabled) {
        vec4 texel = texture2D(map0, texCoord0);
        color *= texel.rgb;     // modulate
    }

    // add specular
    color += pow(dotNH, materialShininess) * materialSpecular.xyz * lightColor.xyz;

    // add attenuation
    //color *= attFactor;

    //@@gl_FragColor = vec4(color.rgb, diffuse.a * texel.a);
    gl_FragColor = vec4(color, diffuse.a);  // keep alpha as original material has

    /*
    if(attFactor > 0.0)
    {
        // add diffuse
        color += dotNL * diffuse.xyz;

        // apply texturing before specular
        //@@vec4 texel = texture2D(map0, texCoord);
        //@@color *= texel.rgb;     // modulate

        // add specular
        if(dotNH > 0.0)
            color += pow(dotNH, materialShininess) * materialSpecular.xyz * lightColor.xyz;

        // add attenuation
        if(attFactor < 1.0)
            color *= attFactor;

        //@@gl_FragColor = vec4(color.rgb, diffuse.a * texel.a);
        gl_FragColor = vec4(color, diffuse.a);  // keep alpha as original material has
    }
    */
}
