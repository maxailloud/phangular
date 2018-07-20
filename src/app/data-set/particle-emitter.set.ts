export interface ParticleEmitterSet {
    manager: number;
    speed: number;
    scale: {
        start: 1,
        end: number
    };
    blendMode: Phaser.BlendModes;
}
