var Library = function(){
	var that = Object.create(Library.prototype);
	var samples = [];
	that.getSamples = function(){
		return samples;
	};
	that.addSample = function(sample){
		samples.push(sample);
	}
	that.removeSample = function(sample){
		delete samples[index];
	}
	that.inUse = function(index){
		return samples[index].inUse;
	}
	Object.freeze(that);
	return that;
}