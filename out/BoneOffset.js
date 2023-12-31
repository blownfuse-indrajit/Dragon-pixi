"use strict";
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
var BoneOffset = /** @class */ (function (_super) {
    __extends(BoneOffset, _super);
    function BoneOffset() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/bullet_01/bullet_01_ske.json", "resource/bullet_01/bullet_01_tex.json", "resource/bullet_01/bullet_01_tex.png");
        return _this;
    }
    BoneOffset.prototype._onStart = function () {
        var factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/bullet_01/bullet_01_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/bullet_01/bullet_01_tex.json"].data, this._pixiResources["resource/bullet_01/bullet_01_tex.png"].texture);
        for (var i = 0; i < 100; ++i) {
            var armatureDisplay = factory.buildArmatureDisplay("bullet_01");
            armatureDisplay.on(dragonBones.EventObject.COMPLETE, this._animationHandler, this);
            armatureDisplay.x = 0.0;
            armatureDisplay.y = 0.0;
            this.addChild(armatureDisplay);
            //
            this._moveTo(armatureDisplay);
        }
    };
    BoneOffset.prototype._animationHandler = function (event) {
        this._moveTo(event.armature.display);
    };
    BoneOffset.prototype._moveTo = function (armatureDisplay) {
        var fromX = armatureDisplay.x;
        var fromY = armatureDisplay.y;
        var toX = Math.random() * this.stageWidth - this.stageWidth * 0.5;
        var toY = Math.random() * this.stageHeight - this.stageHeight * 0.5;
        var dX = toX - fromX;
        var dY = toY - fromY;
        var rootSlot = armatureDisplay.armature.getBone("root");
        var bulletSlot = armatureDisplay.armature.getBone("bullet");
        // Modify root and bullet bone offset.
        rootSlot.offset.scaleX = Math.sqrt(dX * dX + dY * dY) / 100; // Bullet translate distance is 100 px.
        rootSlot.offset.rotation = Math.atan2(dY, dX);
        rootSlot.offset.skew = Math.random() * Math.PI - Math.PI * 0.5; // Random skew.
        bulletSlot.offset.scaleX = 0.5 + Math.random() * 0.5; // Random scale.
        bulletSlot.offset.scaleY = 0.5 + Math.random() * 0.5;
        // Update root and bullet bone.
        rootSlot.invalidUpdate();
        bulletSlot.invalidUpdate();
        //
        armatureDisplay.animation.timeScale = 0.5 + Math.random() * 1.0; // Random animation speed.
        armatureDisplay.animation.play("idle", 1);
    };
    return BoneOffset;
}(BaseDemo));
