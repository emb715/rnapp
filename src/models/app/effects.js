/* eslint-disable no-console */

const effects = {
  async getConfig() {
    const newConfig = {
      config: 'some config',
    };
    setTimeout(() => {
      console.log('getConfig delay');
    }, 5000);
    this.setConfig(newConfig);
  },
};
export default effects;
