var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var laya;
(function (laya) {
    var Sprite = Laya.Sprite;
    var Stage = Laya.Stage;
    var Event = Laya.Event;
    var Rectangle = Laya.Rectangle;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var WebGL = Laya.WebGL;
    var Tween = Laya.Tween;
    var SoundManager = Laya.SoundManager;
    var Game = /** @class */ (function () {
        function Game() {
            this.ApePath = "../laya/assets/war/14.png";
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            Laya.loader.load(this.ApePath, Handler.create(this, this.setup));
            SoundManager.playMusic("../laya/assets/war/bgMusic.wav", 0);
        }
        Game.prototype.setup = function () {
            this.createApe();
            this.showDragRegion();
        };
        Game.prototype.createApe = function () {
            this.ape = new Sprite();
            this.ape.loadImage(this.ApePath);
            Laya.stage.addChild(this.ape);
            var texture = Laya.loader.getRes(this.ApePath);
            this.ape.pivot(texture.width / 2, texture.height / 2);
            this.ape.x = Laya.stage.width / 2;
            this.ape.y = Laya.stage.height / 2;
            this.ape.on(Event.MOUSE_DOWN, this, this.onStartDrag);
            this.ape.on(Event.MOUSE_UP, this, this.onstopDrag);
        };
        Game.prototype.showDragRegion = function () {
            //拖动限制区域
            var dragWidthLimit = Browser.clientWidth + this.ape.width;
            var dragHeightLimit = Browser.clientHeight + this.ape.height;
            this.dragRegion = new Rectangle(Laya.stage.width - dragWidthLimit >> 1, Laya.stage.height - dragHeightLimit >> 1, dragWidthLimit, dragHeightLimit);
        };
        Game.prototype.onStartDrag = function (e) {
            //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
            this.ape.startDrag(this.dragRegion, false, 100);
        };
        Game.prototype.onstopDrag = function (e) {
            //停止拖拽
            Tween.to(this.ape, { x: Laya.stage.width / 2, y: Laya.stage.height / 2 }, 200);
        };
        return Game;
    }());
    laya.Game = Game;
})(laya || (laya = {}));
new laya.Game();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWFBaXJJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBLElBQU8sSUFBSSxDQTJFVjtBQTNFRCxXQUFPLElBQUk7SUFDUCxJQUFPLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDMUIsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMxQixJQUFPLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBRWxDLElBQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDOUIsSUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzFCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDMUIsSUFBTyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUd4QztRQU9JO1lBTlEsWUFBTyxHQUFXLDJCQUEyQixDQUFDO1lBT2xELHVCQUF1QjtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7WUFFdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxL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QUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIm1vZHVsZSBsYXlhIHtcclxuICAgIGltcG9ydCBTcHJpdGUgPSBMYXlhLlNwcml0ZTtcclxuICAgIGltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2U7XHJcbiAgICBpbXBvcnQgRXZlbnQgPSBMYXlhLkV2ZW50O1xyXG4gICAgaW1wb3J0IFJlY3RhbmdsZSA9IExheWEuUmVjdGFuZ2xlO1xyXG4gICAgaW1wb3J0IFRleHR1cmUgPSBMYXlhLlRleHR1cmU7XHJcbiAgICBpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlcjtcclxuICAgIGltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG4gICAgaW1wb3J0IFdlYkdMID0gTGF5YS5XZWJHTDtcclxuICAgIGltcG9ydCBUd2VlbiA9IExheWEuVHdlZW47XHJcbiAgICBpbXBvcnQgU291bmRNYW5hZ2VyID0gTGF5YS5Tb3VuZE1hbmFnZXI7XHJcblxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgICAgICBwcml2YXRlIEFwZVBhdGg6IHN0cmluZyA9IFwiLi4vbGF5YS9hc3NldHMvd2FyLzE0LnBuZ1wiO1xyXG5cclxuICAgICAgICBwcml2YXRlIGFwZTogU3ByaXRlO1xyXG4gICAgICAgIHByaXZhdGUgZHJhZ1JlZ2lvbjogUmVjdGFuZ2xlO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIC8vIOS4jeaUr+aMgVdlYkdM5pe26Ieq5Yqo5YiH5o2i6IezQ2FudmFzXHJcbiAgICAgICAgICAgIExheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG5cclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWxpZ25IID0gU3RhZ2UuQUxJR05fQ0VOVEVSO1xyXG5cclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBcInNob3dhbGxcIjtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5iZ0NvbG9yID0gXCIjMjMyNjI4XCI7XHJcblxyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMuQXBlUGF0aCwgSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5zZXR1cCkpO1xyXG5cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlNdXNpYyhcIi4uL2xheWEvYXNzZXRzL3dhci9iZ011c2ljLndhdlwiLCAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFwZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dEcmFnUmVnaW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFwZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5hcGUgPSBuZXcgU3ByaXRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFwZS5sb2FkSW1hZ2UodGhpcy5BcGVQYXRoKTtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZTogVGV4dHVyZSA9IExheWEubG9hZGVyLmdldFJlcyh0aGlzLkFwZVBhdGgpO1xyXG4gICAgICAgICAgICB0aGlzLmFwZS5waXZvdCh0ZXh0dXJlLndpZHRoIC8gMiwgdGV4dHVyZS5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgdGhpcy5hcGUueCA9IExheWEuc3RhZ2Uud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB0aGlzLmFwZS55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hcGUub24oRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5vblN0YXJ0RHJhZyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFwZS5vbihFdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5vbnN0b3BEcmFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd0RyYWdSZWdpb24oKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8v5ouW5Yqo6ZmQ5Yi25Yy65Z+fXHJcbiAgICAgICAgICAgIHZhciBkcmFnV2lkdGhMaW1pdDogbnVtYmVyID0gQnJvd3Nlci5jbGllbnRXaWR0aCt0aGlzLmFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGRyYWdIZWlnaHRMaW1pdDogbnVtYmVyID0gQnJvd3Nlci5jbGllbnRIZWlnaHQgKyB0aGlzLmFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlZ2lvbiA9IG5ldyBSZWN0YW5nbGUoTGF5YS5zdGFnZS53aWR0aCAtIGRyYWdXaWR0aExpbWl0ID4+IDEsIExheWEuc3RhZ2UuaGVpZ2h0IC0gZHJhZ0hlaWdodExpbWl0ID4+IDEsIGRyYWdXaWR0aExpbWl0LCBkcmFnSGVpZ2h0TGltaXQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25TdGFydERyYWcoZTogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy/pvKDmoIfmjInkuIvlvIDlp4vmi5bmi70o6K6+572u5LqG5ouW5Yqo5Yy65Z+f5ZKM6LaF55WM5by55Zue55qE5ruR5Yqo5pWI5p6cKVxyXG4gICAgICAgICAgICB0aGlzLmFwZS5zdGFydERyYWcodGhpcy5kcmFnUmVnaW9uLCBmYWxzZSwgMTAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25zdG9wRHJhZyhlOiBFdmVudCk6dm9pZHtcclxuICAgICAgICAgICAgLy/lgZzmraLmi5bmi71cclxuICAgICAgICAgICAgVHdlZW4udG8odGhpcy5hcGUsIHsgeDogTGF5YS5zdGFnZS53aWR0aCAvIDIgLCB5OkxheWEuc3RhZ2UuaGVpZ2h0IC8gMiB9LCAyMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5uZXcgbGF5YS5HYW1lKCk7Il19
