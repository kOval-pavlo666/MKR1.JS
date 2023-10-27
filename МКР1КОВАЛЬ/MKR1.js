// Структурний шаблон: Декоратор для додавання функціональності еліксирів захисту
function addElixirProtection(player, resistType, resistPercent) {
    const originalApplyDamage = player.applyDamage.bind(player);
    player.applyDamage = function (damage) {
        const effectiveDamage = damage * (1 - resistPercent / 100);
        originalApplyDamage(effectiveDamage);
    };
    console.log(`${player.name} має захист від ${resistType} на ${resistPercent}%.`);
}

class Magic {
    constructor(name, damage, type) {
        this.name = name;
        this.damage = damage;
        this.type = type;
    }

    cast(player) {
        console.log(`${this.name} наносить магічний урон гравцю ${player.name}.`);
        player.applyDamage(this.damage);
    }
}

class Player {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }
    applyDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            console.log(`${this.name} помер.`);
        } else {
            console.log(`${this.name} має ${this.hp} НР.`);
        }
    }
}


const player1 = new Player("Гравець 1", 100);
const fireMagic = new Magic("Вогняна магія", 20, "вогню");
const poisonMagic = new Magic("Магія отрути", 15, "яду");

fireMagic.cast(player1); // Нанесення магічного урону від вогню
poisonMagic.cast(player1); // Нанесення магічного урону від яду

addElixirProtection(player1, "вогню", 20); // Додавання захисту від вогню
addElixirProtection(player1, "яду", 15); // Додавання захисту від яду

fireMagic.cast(player1); // Повторне нанесення магічного урону від вогню (з урахуванням захисту)
poisonMagic.cast(player1); // Повторне нанесення магічного урону від яду (з урахуванням захисту)
