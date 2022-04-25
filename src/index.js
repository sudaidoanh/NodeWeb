const path = require('path');
const port = 3000;
const express = require('express');
const methodOverride = require('method-override');
const { engine } = require ('express-handlebars');
const db = require('./config/db');

const SortMidleware = require('./app/middlewares/SortMidleware');

db.connect();

const route = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true,
    
}));
app.use(express.json());

app.use(methodOverride('_method'));


//custom middleware
app.use(SortMidleware);


app.engine('handlebars',
    engine({
        helpers: {
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `
                    <a href="?_sort&column=${field}&type=${type}" class="ml-3"">
                        <span class="${icon}"></span>
                    </a>`;
            },
            sum:(a, b) => a + b,
            discount: (price, discount) => {
                return price * (100 - discount) / 100;
            },
            formatCurrency: (number) => {
                return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
            }
        }

    }),
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources','views'));

route(app);

app.listen(port, () => console.log(`App is listening at port ${port}`));
