const modules = import.meta.glob('../assets/items/*.svg', {
  eager: true,
  query: '?react',
  import: 'default',
});

export const ITEMS = Object.fromEntries(
  Object.entries(modules).map(([path, Component]) => {
    const name = path.split('/').pop().replace('.svg', '');
    return [name, Component];
  })
);
