import Taro from "@tarojs/taro";

class Audio {
  _audio = Taro.createInnerAudioContext({
    useWebAudioImplement: true,
  });

  _playing = false;

  constructor() {
    this._audio.autoplay = false;
    this._audio.loop = false;
  }

  play(src: string): void {
    if (this._playing) {
      this._audio.stop();
      this._playing = false;
    }
    this._audio.src = src;
    this._audio.play();
    this._playing = true;
  }
}

export const audio = new Audio();

export const AudioSrc = {
  login:
    "https://jiyu-1306028870.cos.ap-shanghai.myqcloud.com/wxapp%2F%E9%9F%B3%E6%95%88%2F%E7%99%BB%E9%99%86.wav",
};
