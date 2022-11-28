/**
 * Создать подключаемые маски для:
 *  - телефона
 *  - почты
 *  По условию, если текущий элемент имеет атрибут mask-data-phone, mask-data-email
 */

class Strategy {
    constructor(nameIdf) {
        this.name = nameIdf
    }
    execute() {
        throw new Error(`Вы не описали стратегию для - ${this.iam()}`)
    }
    iam() {
        return this.name
    }
}
class PhoneStrategy extends Strategy {
    execute() {
        console.log('Выполнение логики для стратегии телефона')
    }
}
class EmailStrategy extends Strategy {
    execute() {
        console.log('Выполнение логики для стратегии почты')
    }
}

const phoneStrategy = new PhoneStrategy('data-mask-phone');
const emailStrategy = new EmailStrategy('data-mask-email');

class MaskHandler {
    constructor() {
        this.strategy = {};
    }

    use(strategy) {
        this.strategy[strategy.iam()] = strategy;
    }

    check(node) {
        for (const properties in this.strategy) {
            const isHaveStrategy = node.hasAttribute(properties);
            if (isHaveStrategy) {
                this.strategy[properties].execute();
                break;
            }
        }
    }
}
const maskHandler = new MaskHandler();

maskHandler.use(phoneStrategy)
maskHandler.use(emailStrategy)

document.addEventListener('click', e => {
    if (e.target.tagName === 'INPUT') {
        maskHandler.check(e.target)
    }
})