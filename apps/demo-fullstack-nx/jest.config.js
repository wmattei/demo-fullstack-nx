module.exports = {
  name: 'demo-fullstack-nx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/demo-fullstack-nx',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
