var Track = function(tempo, sample, init_cb){
	var that = Object.create(Track.prototype),
		soundLoaded = false,
		sample = sample,
		sound = new p5.SoundFile(sample.path, function(){trackLoaded()});

	var trackLoaded = function(cb){
		var callback = cb ? cb : init_cb;
		soundLoaded = true;
		callback();
	};
	that.play = function(){
		sound.play();
	};
	that.getTempo = function(){
		return tempo;
	};

	that.setTempo = function(new_tempo){
		tempo = new_tempo;
	};

	that.changeSample = function(new_sample, callback){
		sample = new_sample;
		sound.setPath(sample.path, trackLoaded(callback));
	};
	that.isPlaying = function(){
		return sound.isPlaying();
	}
	that.stop = function(){
		sound.stop();
	}

	Object.freeze(that);
	return that;
}

