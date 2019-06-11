module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Event = Laya.Event;
    import Rectangle = Laya.Rectangle;
    import Texture = Laya.Texture;
    import Browser = Laya.Browser;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;
    import Tween = Laya.Tween;
    import SoundManager = Laya.SoundManager;


    export class Game {
        private ApePath: string = "../laya/assets/war/14.png";

        private ape: Sprite;
        private dragRegion: Rectangle;


        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";

            Laya.loader.load(this.ApePath, Handler.create(this, this.setup));

            //播放背景音乐
            SoundManager.playMusic("../laya/assets/war/bgMusic.wav", 0);

        }

        private setup(): void {
            this.createApe();
            this.showDragRegion();
        }

        private createApe(): void {
            this.ape = new Sprite();

            this.ape.loadImage(this.ApePath);
            Laya.stage.addChild(this.ape);

            var texture: Texture = Laya.loader.getRes(this.ApePath);
            this.ape.pivot(texture.width / 2, texture.height / 2);
            this.ape.x = Laya.stage.width / 2;
            this.ape.y = Laya.stage.height / 2;

            this.ape.on(Event.MOUSE_DOWN, this, this.onStartDrag);

            this.ape.on(Event.MOUSE_UP, this, this.onstopDrag);
        }

        private showDragRegion(): void {
            //拖动限制区域
            var dragWidthLimit: number = Browser.clientWidth+this.ape.width;
            var dragHeightLimit: number = Browser.clientHeight + this.ape.height;
            this.dragRegion = new Rectangle(Laya.stage.width - dragWidthLimit >> 1, Laya.stage.height - dragHeightLimit >> 1, dragWidthLimit, dragHeightLimit);

        }

        private onStartDrag(e: Event): void {
            //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
            this.ape.startDrag(this.dragRegion, false, 100);
        }

        private onstopDrag(e: Event):void{
            //停止拖拽
            Tween.to(this.ape, { x: Laya.stage.width / 2 , y:Laya.stage.height / 2 }, 200);
        }
    }
}
new laya.Game();