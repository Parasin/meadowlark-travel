let fortunes = [
    'Fortune 1',
    'Fortune 2',
    'Fortune 3',
    'Fortune 4'
];

exports.getFortune = () => {
    let index = Math.floor( Math.random() * fortunes.length );
    return fortunes[ index ];
};
