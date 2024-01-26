const readlineSync = require('readline-sync');

// Объект корзины
const shoppingCart = {
    items: [], // Массив товаров в корзине
    total: 0, // Общая стоимость товаров в корзине

    // Метод для добавления товара в корзину
    addItem: function(name, price, quantity) {
        // Проверка, есть ли уже такой товар в корзине
        const item = this.items.find(item => item.name === name);
        if (item) {
            // Если товар найден, увеличиваем количество
            item.quantity += quantity;
        } else {
            // Если нет, добавляем товар как новый элемент массива
            this.items.push({ name, price, quantity });
        }
        // Пересчет общей стоимости
        this.calculateTotal();
    },

    // Метод для удаления товара из корзины
    removeItem: function(name) {
        // Находим индекс товара в массиве по имени
        const index = this.items.findIndex(item => item.name === name);
        if (index !== -1) {
            // Если товар нашёлся, удаляем его
            this.items.splice(index, 1);
            // Пересчет общей стоимости
            this.calculateTotal();
        }
    },

    // Метод для обновления количества товара
    updateQuantity: function(name, quantity) {
        // Находим товар в массиве по имени
        const item = this.items.find(item => item.name === name);
        if (item) {
            // Обновляем количество
            item.quantity = quantity;
            // Пересчет общей стоимости
            this.calculateTotal();
        }
    },

    // Метод для расчета общей стоимости товаров в корзине
    calculateTotal: function() {
        // Суммируем стоимость всех товаров
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // Метод для очистки корзины
    clearCart: function() {
        // Очищаем массив товаров
        this.items = [];
        // Обнуляем общую стоимость
        this.total = 0;
    },

    // Метод для взаимодействия с пользователем через консоль
    interact: function() {
        let input, name, price, quantity;
        // Основной цикл интерфейса пользователя
        while (input !== 'quit') {
            // Пользовательский интерфейс с опциями
            console.log('\nВыберите опцию:');
            console.log('1: Добавить товар\n2: Удалить товар\n3: Изменить количество товара\n4: Показать корзину\n5: Очистить корзину\nquit: Выход');
            input = readlineSync.question('Введите команду: ');
            
            // Ветвление для выполнения действий в зависимости от выбора пользователя
            switch (input) {
                case '1':
                    // Добавление товара
                    name = readlineSync.question('Введите название товара: ');
                    price = readlineSync.questionFloat('Введите цену товара: ');
                    quantity = readlineSync.questionInt('Введите количество: ');
                    this.addItem(name, price, quantity);
                    console.log(`${name} добавлен в корзину.`);
                    break;
                case '2':
                    // Удаление товара
                    name = readlineSync.question('Введите название товара для удаления: ');
                    this.removeItem(name);
                    console.log(`${name} удален из корзины.`);
                    break;
                case '3':
                    // Изменение количества товара
                    name = readlineSync.question('Введите название товара для изменения количества: ');
                    quantity = readlineSync.questionInt('Введите новое количество: ');
                    this.updateQuantity(name, quantity);
                    console.log(`Количество ${name} изменено.`);
                    break;
                case '4':
                    // Показать содержимое корзины
                    console.log('\nТовары в корзине:', this.items);
                    console.log(`Общая стоимость: ${this.total}`);
										break;
                case '5':
                    // Очистить корзину
                    this.clearCart();
                    console.log('Корзина очищена.');
                    break;
                case 'quit':
                    // Выход из программы
                    console.log('Выход из программы.');
                    break;
                default:
                    // Если введена неверная команда
                    console.log('Неверная команда.');
            }
        }
    }
};

// Вызов метода для интерактивного взаимодействия пользователя с корзиной
shoppingCart.interact();
