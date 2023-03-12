import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'master',
  repo: 'https://github.com/Heisaa/lunch.git', // Update to point to your repository
  user: {
   name: 'Heisaa', // update to use your name
   email: '' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);