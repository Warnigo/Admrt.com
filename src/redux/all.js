const generateID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%#!)_=+-';
    let id = '';
    for (let i = 0; i < 12; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

const Id = generateID()
export {
    Id,
}
