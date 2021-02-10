if (process.env.NODE_ENV === 'production') {
    export import './prod';
} else {
    export  import './dev';
}