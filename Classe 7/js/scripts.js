const DATA = {
    id: 0,
    title: 'Rocket Chicory Salad with White Wine Vinaigrette',
    pictureUrl: 'images/1.jpg',
    info: {
        numServings: 4,
        prepTime: {
            hours: 1,
            minutes: 15
        },
        difficulty: 1
    },
    ingredients: [
        {
            name: 'white wine',
            quantity: '2 tbsp'
        },
        {
            name: 'lemon juice',
            quantity: '2 tbsp'
        },
        {
            name: 'honey',
            quantity: '1/2 tsp'
        },
        {
            name: 'mustard',
            quantity: '1/2 tsp'
        },
        {
            name: 'salt',
            quantity: '1/2 tsp'
        },
        {
            name: 'freshly ground black pepper',
            quantity: '1/4 tsp'
        },
        {
            name: 'extra-virgin olive oil',
            quantity: '1/4 tsp'
        },
        {
            name: 'rocket',
            quantity: '120g'
        },
        {
            name: 'heads of chicory, chopped',
            quantity: '2 u'
        },
        {
            name: 'toasted walnuts',
            quantity: '40g'
        }
    ],
    directions: [
        'Mix the wine, lemon juice, honey, mustard, salt, and pepper in a blender. With the machine running gradually blend in the oil. Season the vinaigrette to taste with more salt and pepper, if desired.',
        'In a large bowl combine the rocket, chicory, and walnuts. Toss with 60ml of the vinaigrette to coat and adding more vinaigrette, if desired. Serve immediately.',
        'Any remaining vinaigrette can be saved in an airtight container in the refrigerator for 3 days and should be brought up to room temperature before using.'
    ],
};

class Recipe {
    constructor(data, containerId) {
        this.id = data.id;
        this.title = data.title;
        this.pictureUrl = data.pictureUrl;
        this.info = data.info;
        this.ingredients = data.ingredients;
        this.directions = data.directions;
        this.containerId = containerId;
    }

    showRecipe() {
        let container = document.getElementById(this.containerId);
        container.innerHTML = '';

        let title = document.createElement('h1');
        title.innerHTML = this.title;
        container.appendChild(title);

        let picture = document.createElement('img');
        picture.src = this.pictureUrl;
        picture.classList.add('recipe-picture');
        container.appendChild(picture);

        let servingsButtons = document.createElement('div');
        let removeServingButton = document.createElement('button');
        removeServingButton.innerHTML = "-1 serving";
        removeServingButton.onclick = this.removeServing;
        let addServingButton = document.createElement('button');
        addServingButton.innerHTML = "+1 serving";
        addServingButton.onclick = this.addServing;

        servingsButtons.appendChild(addServingButton);
        servingsButtons.appendChild(removeServingButton);
        container.appendChild(servingsButtons);

        let info = document.createElement('div');
        info.innerHTML =
            "Servings: " + this.info.numServings + "<br>" +
            "Prep time: " + this.info.prepTime.hours + "h " + this.info.prepTime.minutes + "min" + "<br>" +
            "Difficulty: " + this.info.difficulty;
        container.appendChild(info);

        let ingredients = document.createElement('ul');
        this.ingredients.forEach(element => {
            let ingredient = document.createElement('li');
            ingredient.innerHTML = element.name + " (" + element.quantity + ")";
            ingredients.appendChild(ingredient);
        });
        container.appendChild(ingredients);

        let directionsTitle = document.createElement('h2');
        directionsTitle.innerHTML = "Directions";
        container.appendChild(directionsTitle);

        this.directions.forEach(element => {
            let direction = document.createElement('p');
            direction.innerHTML = element;
            container.appendChild(direction);
        });
    }

    modifyServings = (num) => {
        this.info.numServings += num;
        if (this.info.numServings < 1) {
            this.info.numServings = 1;
            return;
        }

        this.info.prepTime.minutes += num * 10;
        if (this.info.prepTime.minutes < 0) {
            this.info.prepTime.minutes += 60;
            this.info.prepTime.hours--;
        } else if (this.info.prepTime.minutes >= 60) {
            this.info.prepTime.minutes -= 60;
            this.info.prepTime.hours++;
        }

        this.showRecipe();
    }

    addServing = () => {
        this.modifyServings(1);
    }

    removeServing = () => {
        this.modifyServings(-1);
    }
}

window.onload = () => {
    const recipeInstance = new Recipe(DATA, 'root');
    recipeInstance.showRecipe();
}