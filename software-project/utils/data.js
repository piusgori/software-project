export const frameworks = [
    { name: 'React', image: 'https://www.shutterstock.com/image-vector/react-logo-programming-icon-web-600w-2206926335.jpg' },
    { name: 'Django', image: 'https://www.shutterstock.com/shutterstock/photos/1996108187/display_1500/stock-vector-conceptual-business-illustration-with-the-words-django-learn-django-programming-language-computer-1996108187.jpg' },
    { name: 'Angular', image: 'https://www.shutterstock.com/shutterstock/photos/1527054845/display_1500/stock-vector-angular-emblem-white-letter-on-red-background-1527054845.jpg' },
];

export const questions = [
    { 
        id: 1,
        title: 'React Native Like Instagram',
        question: 'How can we achieve the grid like this. I looked in many react native libraries but still in search of it. I tried a custom grid view but creating an issue when not having more data. Please let me know the best way for it.',
        date: '2023-01-02T14:54:56.370Z',
        views: 2600,
        answers: [
            {
                id: '1-1',
                votes: 28,
                answer: 'I created cells containing three images. There are a total of 3 types of cells. Big Image on the right side. Big Image on the left side. Normal grid with No Big Image.'
            },
            {
                id: '1-2',
                votes: 24,
                answer: 'I create chunks or we can array of arrays using lodash which works as data for each row. Each small chunk or array will have 3 objects. groupEveryNthRow = 3 means I\'ll have cell with a big image on every 3rd row starting from 0. bigImageSide represents that on which side the big image should appear. I keep changing left to right. You can choose according to your case.'
            },
        ]
    },
    { 
        id: 2,
        title: 'Loop inside React JSX',
        question: 'I\'m trying to do something like the following in React JSX (where ObjectRow is a separate component):',
        date: '2023-01-02T14:54:56.370Z',
        views: 1400,
        answers: [
            {
                id: '2-1',
                votes: 30,
                answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)'
            },
        ]
    },
];

export const chats = [
    { name: 'Michael Scott', message: 'Hello Again', image: 'https://i.pinimg.com/236x/bf/d6/b5/bfd6b5ead3e81c7d0ff530a2a6c98de3.jpg', time: '2023-03-02T14:54:56.370Z' },
    { name: 'Sheldon Cooper', message: 'Bazinga', image: 'https://i.pinimg.com/236x/11/9c/21/119c2196099681076d0ff31e043dd7b7.jpg', time: '2023-03-02T14:54:56.370Z' },
    { name: 'Leonard Hofstadter', message: 'Yeah', image: 'https://i.pinimg.com/236x/dc/c3/b6/dcc3b652f4b0a52becda01981b35798b.jpg', time: '2023-03-02T14:54:56.370Z' },
    { name: 'Charlie Harper', message: 'Atta Boy', image: 'https://i.pinimg.com/236x/d4/d9/d5/d4d9d583d41d205e1ec6b06f5c0961fe.jpg', time: '2023-03-02T14:54:56.370Z' },
];