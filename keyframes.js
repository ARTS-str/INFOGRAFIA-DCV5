class Keyframe { //objeto keyframe, con un valor temporal y otro numerico
    constructor(t, value){
        this.t = t;
        this.value = value;
    }
}
class Timeline {//objeto de linea de tiempo
    constructor(){
        this.timestep = 0.001; //resolucion de la linea de tiempo
        this.keyframes = [];
        this.timelineValues = [];
        this.currentTime = 0;
    }

    addKeyframe(t, v){ //agregar un keyframe a la linea de tiempo
        if (this.keyframes.length > 0) { //si no está vacio
            for(let keyframe of this.keyframes){ //pasar por todos los keyframes
                if(keyframe.t !== t){ //si no solapa temporalmente con otro
                    this.keyframes.push(new Keyframe(t, v)); //agregar
                } else{ //si el que se quiere insertar esta en el mismo valor temporal que uno ya existente
                    keyframe.value = v; //cambiar el valor
                }
            }
        } else{ //si está vacio
            this.keyframes.push(new Keyframe(t, v)); //agregar
        }
    }
    setAllValues(init = new Keyframe(0, 0), end = new Keyframe(1, 0)){
        this.keyframes.unshift(init);
        this.keyframes.push(end);
        for(let x = 0; x < this.keyframes.length-1; x++){
            for(let t = this.keyframes[x].t; t < this.keyframes[x+1].t; t += this.timestep){
                this.timelineValues.push(this.lerp(this.keyframes[x], this.keyframes[x+1], t));
            }
        }
        this.timelineValues.push(end)
    }
    lerp(k1, k2, t){
        const span = k2.t - k1.t;
        const normalized = (t - k1.t) / span;
        const value = k1.value + (k2.value - k1.value) * normalized;
        return new Keyframe(t, value);
    }
    valueAt(percent){
        this.currentTime = percent;
        return this.timelineValues[percent].value;
    }
    keyAt(percent){
        return this.timelineValues[percent];
    }
    getClosestKeyframe(){
        let output;
        let dTArray = [];
        let valuesArray = [];
        for(let keyframe of this.keyframes){
            dTArray.push(keyframe); //array de diferencias de tiempo a tiempo actual
            valuesArray.push(Math.abs(keyframe.t - this.currentTime));
        }
        let minTime = Math.min.apply(null, valuesArray);
        let outPosition = valuesArray.indexOf(minTime);
        output = dTArray[outPosition];
        return output
    }
}
