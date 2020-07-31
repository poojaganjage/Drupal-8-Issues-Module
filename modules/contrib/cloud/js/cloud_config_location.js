(function ($, drupalSettings) {
  'use strict';

  let svg = d3.select('#cloud_config_location')
    .style('text-align', 'center')
    .append('svg');

  let width = $('#cloud_config_location svg').width();
  let height = width * 1 / 2;

  svg.style('width', '100%')
    .style('height', 'auto')
    .style('max-width', '750px')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMinYMin');

  let defs = svg.append("defs");
  let g_pointer = defs.append('g')
    .attr('id', 'pointer')
    .attr('transform', 'scale(0.15)');
  g_pointer.append('path')
    .attr('d', 'M0-1c-14.5-25.6-14.5-25.7-14.5-33.8c0-8.1,6.5-14.6,14.5-14.6s14.5,6.6,14.5,14.6C14.5-26.7,14.5-26.6,0-1z');
  g_pointer.append('path')
    .attr('d', 'M0-49c7.7,0,14,6.3,14,14.1c0,8,0,8.1-14,32.8c-14-24.7-14-24.9-14-32.8C-14-42.7-7.7-49,0-49 M0-50c-8.3,0-15,6.8-15,15.1 S-15-26.5,0,0c15-26.5,15-26.5,15-34.9S8.3-50,0-50L0-50z');

  // SVG for AWS pointer
  let aws_pointer = defs.append('g')
    .attr('id', 'aws_pointer')
    .attr('transform', 'scale(0.025)');
  aws_pointer.append('path')
    .attr('fill', '#252f3e')
    .attr('d', 'M84.7 65.3c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6s14.2-7.8 24.5-7.8c3.4 0 6.9.3 10.6.8s7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5s1.4-1.4 2.8-2.1c3.5-1.8 7.7-3.3 12.6-4.5C39.3.8 44.5.2 50 .2c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4h.2zM44.1 80.5c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4s1-5.3 1-8.7V53c-2.9-.7-6-1.3-9.2-1.7s-6.3-.6-9.4-.6c-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L95 9.1c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9L129 73.7l15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9s-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1s-1.5-2-1.9-4l-15.5-64.5-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zM252.9 94c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2l-14.5-4.5c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1s4.2-6 7.2-8.2c3-2.3 6.4-4 10.4-5.2S251.8 0 256.2 0c2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8s-4.7 4.8-4.7 8.9c0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6s4.6 8.8 4.6 14c0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z');
  aws_pointer.append('path')
    .attr('fill', '#f90')
    .attr('d', 'M271.8 142.6c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z');
  aws_pointer.append('path')
    .attr('fill', '#f90')
    .attr('d', 'M285.5 127c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z');

  // SVG for openstack pointer
  let openstack_pointer = defs.append('g')
    .attr('id', 'openstack_pointer')
    .attr('transform', 'scale(0.030)');

  openstack_pointer.append('path')
    .attr('fill', '#ed1944')
    .attr('transform', 'translate(-294.67 -215.24)')
    .attr('d', 'M461.82,215.24h-150a17.17,17.17,0,0,0-17.12,17.12v40.35h41.61v-6.59a9.26,9.26,0,0,1,9.26-9.26h82.53a9.26,9.26,0,0,1,9.26,9.26v6.59H479V232.36A17.18,17.18,0,0,0,461.82,215.24Z');

  openstack_pointer.append('path')
    .attr('fill', '#ed1944')
    .attr('transform', 'translate(-294.67 -215.24)')
    .attr('d', 'M437.33,344.72a9.27,9.27,0,0,1-9.26,9.26H345.54a9.27,9.27,0,0,1-9.26-9.26v-6.59H294.67v40.34a17.17,17.17,0,0,0,17.12,17.13h150A17.18,17.18,0,0,0,479,378.47V338.13H437.33Z');

  openstack_pointer.append('path')
    .attr('fill', '#ed1944')
    .attr('transform', 'translate(-294.67 -215.24)')
    .attr('d', 'M504.33,386.39a9.2,9.2,0,1,0-9.2,9.21A9.21,9.21,0,0,0,504.33,386.39Zm-9.2,6.94a6.94,6.94,0,1,1,6.94-6.94A6.94,6.94,0,0,1,495.13,393.33Z');

  openstack_pointer.append('path')
    .attr('fill', '#ed1944')
    .attr('transform', 'translate(-294.67 -215.24)')
    .attr('d', 'M498.58,384.72v-.05a2.88,2.88,0,0,0-.76-2.09,3.38,3.38,0,0,0-2.45-.86H492v9h1.86v-3H495l1.66,3h2.14l-1.92-3.35A2.72,2.72,0,0,0,498.58,384.72Zm-1.88.06a1.3,1.3,0,0,1-1.47,1.35h-1.38v-2.72h1.34c1,0,1.51.45,1.51,1.35Z');

  openstack_pointer.append('rect')
  .attr('y', '69.37')
  .attr('height', '41.62')
  .attr('width', '41.62');

  openstack_pointer.append('rect')
  .attr('x', '142.66')
  .attr('y', '69.37')
  .attr('height', '41.62')
  .attr('width', '41.62');

  // SVG for K8s pointer
  let k8s_pointer = defs.append('g')
    .attr('id', 'k8s_pointer')
    .attr('transform', 'scale(0.025)');
  k8s_pointer.append('path')
    .attr('d', 'M82.085 244.934c-5.946 0-11.561-2.642-15.36-7.432L8.92 165.657c-3.799-4.79-5.285-10.9-3.799-16.847l20.645-89.682c1.321-5.946 5.285-10.736 10.736-13.378l83.571-39.97c2.643-1.32 5.616-1.981 8.589-1.981 2.973 0 5.945.66 8.588 1.982l83.572 39.804c5.45 2.642 9.414 7.432 10.735 13.378l20.645 89.682c1.322 5.946 0 12.057-3.798 16.847l-57.807 71.845c-3.799 4.624-9.414 7.432-15.36 7.432l-93.15.165z')
    .attr('fill', '#326DE6');

  k8s_pointer.append('path')
    .attr('d', 'M128.495 7.928c2.313 0 4.625.495 6.772 1.486l83.572 39.804c4.294 2.147 7.597 6.111 8.588 10.736l20.645 89.682c1.156 4.79 0 9.745-3.138 13.543l-57.806 71.846c-2.973 3.798-7.598 5.945-12.387 5.945H82.085c-4.79 0-9.414-2.147-12.387-5.945l-57.806-71.846c-2.973-3.798-4.13-8.753-3.138-13.543l20.645-89.682c1.156-4.79 4.294-8.754 8.588-10.736L121.56 9.25c2.147-.826 4.624-1.321 6.936-1.321zm0-7.763c-3.468 0-6.936.826-10.24 2.312l-83.571 39.97c-6.607 3.138-11.231 8.918-12.883 16.02L1.156 148.15c-1.651 7.102 0 14.369 4.625 20.15l57.806 71.845c4.46 5.615 11.231 8.753 18.333 8.753h92.655c7.102 0 13.874-3.138 18.333-8.753l57.807-71.846c4.624-5.615 6.276-13.047 4.624-20.15l-20.645-89.682c-1.651-7.102-6.276-12.882-12.882-16.02L138.57 2.476C135.432.991 131.964.165 128.495.165z')
    .attr('fill', '#FFF');
  k8s_pointer.append('path')
    .attr('d', 'M212.232 142.534c-.165 0-.165 0 0 0h-.165c-.165 0-.33 0-.33-.165-.33 0-.66-.165-.991-.165-1.156-.165-2.147-.33-3.138-.33-.496 0-.991 0-1.652-.166h-.165c-3.468-.33-6.276-.66-8.919-1.486-1.156-.496-1.486-1.156-1.817-1.817 0-.165-.165-.165-.165-.33l-2.147-.66a65.33 65.33 0 0 0-1.156-23.289 68.054 68.054 0 0 0-9.249-21.636l1.652-1.486v-.33c0-.826.165-1.652.825-2.478 1.982-1.817 4.46-3.303 7.433-5.12.495-.33.99-.495 1.486-.826.991-.495 1.817-.99 2.808-1.651.165-.165.495-.33.826-.66.165-.166.33-.166.33-.331 2.312-1.982 2.808-5.285 1.156-7.433-.826-1.156-2.312-1.816-3.799-1.816-1.32 0-2.477.495-3.633 1.321l-.33.33c-.33.165-.496.496-.826.661-.826.826-1.487 1.486-2.147 2.312-.33.33-.66.826-1.156 1.156-2.313 2.478-4.46 4.46-6.607 5.946-.495.33-.99.496-1.486.496-.33 0-.661 0-.991-.166h-.33l-1.983 1.322c-2.147-2.312-4.459-4.294-6.771-6.276a65.958 65.958 0 0 0-34.519-13.709l-.165-2.147-.33-.33c-.496-.496-1.156-.991-1.322-2.147-.165-2.643.166-5.616.496-8.919v-.165c0-.496.165-1.156.33-1.652.165-.99.33-1.982.496-3.138v-1.486c0-2.973-2.313-5.45-5.12-5.45-1.322 0-2.643.66-3.634 1.651-.99.991-1.486 2.312-1.486 3.799v1.321c0 1.156.165 2.147.495 3.138.165.496.165.991.33 1.652v.165c.33 3.303.826 6.276.496 8.919-.165 1.156-.826 1.651-1.321 2.147l-.33.33-.166 2.147c-2.973.33-5.946.66-8.919 1.321-12.717 2.808-23.948 9.25-32.701 18.498l-1.652-1.156h-.33c-.33 0-.661.165-.991.165-.496 0-.991-.165-1.487-.495-2.147-1.486-4.294-3.634-6.606-6.111-.33-.33-.66-.826-1.156-1.156-.661-.826-1.322-1.487-2.148-2.312-.165-.166-.495-.33-.825-.661-.165-.165-.33-.165-.33-.33a5.772 5.772 0 0 0-3.634-1.322c-1.487 0-2.973.661-3.799 1.817-1.652 2.147-1.156 5.45 1.156 7.432.165 0 .165.166.33.166.33.165.496.495.826.66.991.66 1.817 1.156 2.808 1.652.496.165.991.495 1.487.826 2.972 1.816 5.45 3.303 7.432 5.12.826.825.826 1.651.826 2.477v.33l1.651 1.487c-.33.495-.66.826-.826 1.321-8.258 13.048-11.396 28.408-9.249 43.603l-2.147.66c0 .166-.165.166-.165.33-.33.661-.826 1.322-1.817 1.817-2.477.826-5.45 1.157-8.918 1.487h-.166c-.495 0-1.156 0-1.651.165-.991 0-1.982.165-3.138.33-.33 0-.66.166-.991.166-.165 0-.33 0-.496.165-2.973.66-4.79 3.468-4.294 6.11.496 2.313 2.643 3.8 5.285 3.8.496 0 .826 0 1.322-.166.165 0 .33 0 .33-.165.33 0 .66-.165.99-.165 1.157-.33 1.983-.66 2.974-1.156.495-.165.99-.496 1.486-.66h.165c3.138-1.157 5.946-2.148 8.589-2.478h.33c.991 0 1.652.495 2.147.826.165 0 .165.165.33.165l2.313-.33c3.964 12.221 11.561 23.122 21.636 31.05 2.312 1.816 4.624 3.303 7.102 4.79l-.991 2.146c0 .166.165.166.165.33.33.661.66 1.487.33 2.643-.99 2.478-2.477 4.955-4.294 7.763v.165c-.33.496-.66.826-.99 1.321-.661.826-1.157 1.652-1.818 2.643-.165.165-.33.495-.495.826 0 .165-.165.33-.165.33-1.321 2.808-.33 5.946 2.147 7.102.66.33 1.321.496 1.982.496 1.982 0 3.964-1.322 4.955-3.139 0-.165.165-.33.165-.33.165-.33.33-.66.495-.826.496-1.156.661-1.982.991-2.973l.496-1.486c1.156-3.303 1.982-5.946 3.468-8.258.66-.991 1.487-1.156 2.147-1.487.165 0 .165 0 .33-.165l1.157-2.147c7.267 2.808 15.195 4.294 23.122 4.294 4.79 0 9.745-.495 14.37-1.651a73.402 73.402 0 0 0 8.588-2.478l.99 1.817c.166 0 .166 0 .331.165.826.165 1.486.496 2.147 1.487 1.321 2.312 2.312 5.12 3.468 8.258v.165l.496 1.486c.33.991.495 1.982.99 2.973.166.33.331.496.496.826 0 .165.166.33.166.33.99 1.982 2.972 3.139 4.954 3.139.661 0 1.322-.166 1.982-.496 1.156-.66 2.147-1.652 2.478-2.973.33-1.321.33-2.808-.33-4.129 0-.165-.166-.165-.166-.33-.165-.33-.33-.66-.495-.826-.496-.991-1.156-1.817-1.817-2.643-.33-.495-.66-.825-.99-1.32v-.166c-1.818-2.808-3.47-5.285-4.295-7.763-.33-1.156 0-1.816.165-2.642 0-.165.165-.165.165-.33l-.826-1.982c8.754-5.12 16.186-12.388 21.802-21.306 2.973-4.625 5.285-9.745 6.936-14.865l1.982.33c.166 0 .166-.165.33-.165.661-.33 1.157-.825 2.148-.825h.33c2.643.33 5.45 1.32 8.589 2.477h.165c.495.165.99.495 1.486.66.991.496 1.817.826 2.973 1.157.33 0 .66.165.991.165.165 0 .33 0 .495.165.496.165.826.165 1.322.165 2.477 0 4.624-1.651 5.285-3.798 0-1.982-1.817-4.625-4.79-5.45zm-76.47-8.093l-7.267 3.469-7.267-3.469-1.816-7.762 4.954-6.276h8.093l4.955 6.276-1.651 7.762zm43.108-17.176a52.078 52.078 0 0 1 1.156 16.68l-25.27-7.266c-2.312-.66-3.633-2.973-3.138-5.285.165-.661.496-1.322.991-1.817l19.985-18.003c2.807 4.625 4.954 9.91 6.276 15.69zm-14.204-25.6l-21.636 15.36c-1.817 1.156-4.295.825-5.781-.991-.495-.496-.66-1.157-.826-1.817l-1.486-26.922a50.13 50.13 0 0 1 29.729 14.37zM116.769 78.12c1.817-.33 3.468-.66 5.285-.99l-1.486 26.425c-.165 2.312-1.982 4.294-4.46 4.294-.66 0-1.486-.165-1.982-.495L92.16 91.665c6.772-6.772 15.195-11.397 24.609-13.544zm-32.537 23.453l19.654 17.507c1.817 1.487 1.982 4.294.496 6.111-.496.66-1.156 1.156-1.982 1.322l-25.6 7.432c-.991-11.231 1.486-22.627 7.432-32.372zm-4.46 44.759l26.262-4.46c2.147-.165 4.129 1.322 4.624 3.469.165.99.165 1.817-.165 2.643l-10.075 24.278c-9.249-5.946-16.681-15.03-20.645-25.93zm60.285 32.867c-3.799.826-7.598 1.321-11.562 1.321-5.78 0-11.396-.99-16.68-2.642l13.047-23.618c1.321-1.487 3.468-2.147 5.285-1.156a7.04 7.04 0 0 1 1.982 1.816l12.717 22.958c-1.486.495-3.138.826-4.79 1.321zm32.206-22.957c-4.129 6.606-9.58 11.891-15.855 16.02l-10.405-24.94c-.496-1.981.33-4.128 2.312-5.12.66-.33 1.486-.495 2.312-.495l26.426 4.46c-.991 3.633-2.643 6.937-4.79 10.075z')
    .attr('fill', '#FFF');

  // SVG for VMware pointer
  let vmware_pointer = defs.append('g')
    .attr('id', 'vmware_pointer')
    .attr('transform', 'scale(0.002)');

  vmware_pointer.append('path')
    .attr('d', 'M163 2951 c-57 -7 -97 -31 -129 -79 -32 -47 -36 -179 -32 -1107 3 -891 -1 -836 65 -896 53 -50 58 -50 383 -56 l307 -6 5 -342 c5 -333 6 -344 27 -379 13 -20 42 -47 65 -61 l43 -25 944 0 c912 0 945 1 975 19 18 11 45 36 60 57 l29 37 3 940 2 940 -21 44 c-13 27 -37 55 -62 71 l-40 27 -318 3 -318 3 -3 347 -3 347 -25 35 c-30 43 -45 56 -89 75 -29 13 -157 15 -925 14 -490 -1 -914 -5 -943 -8z m1843 -142 c18 -20 19 -44 22 -404 l3 -384 359 -3 c329 -3 361 -5 377 -21 17 -17 18 -68 18 -926 0 -880 -1 -910 -19 -930 l-19 -21 -909 0 c-895 0 -908 0 -928 20 -19 19 -20 33 -20 388 0 202 -3 377 -6 388 -6 22 -8 22 -364 25 -277 3 -362 7 -372 17 -10 10 -14 194 -16 919 -2 804 -1 908 13 929 l15 24 914 0 913 0 19 -21z')
    .attr('fill', '#52ab15');
  vmware_pointer.append('path')
    .attr('d', 'M340 2570 c-13 -8 -15 -99 -18 -703 -2 -687 -2 -693 18 -715 21 -22 22 -22 375 -22 l355 0 1 -302 c1 -390 7 -485 33 -504 17 -12 129 -14 706 -14 653 0 688 1 703 18 21 22 22 62 3 87 -13 18 -43 19 -659 23 l-646 5 -3 398 c-2 218 -7 401 -11 406 -5 4 -175 9 -378 11 l-369 3 -1 582 c0 601 -5 712 -30 728 -18 11 -60 11 -79 -1z')
    .attr('fill', '#52ab15');

  vmware_pointer.append('path')
    .attr('d', 'M668 2309 c-17 -9 -18 -40 -18 -417 0 -304 3 -411 12 -420 9 -9 90 -12 305 -12 l293 0 0 50 0 50 -237 0 c-133 0 -245 5 -253 10 -13 8 -15 57 -18 325 l-3 315 325 0 325 0 3 -770 c3 -723 4 -770 21 -787 16 -17 47 -18 411 -18 373 0 395 1 415 19 21 19 21 25 21 416 0 372 -1 398 -18 413 -16 15 -53 17 -305 17 l-287 0 0 -55 0 -55 248 -2 247 -3 3 -317 2 -317 -42 -6 c-61 -9 -585 -2 -595 8 -4 5 -10 352 -13 771 -4 626 -7 766 -19 779 -12 15 -53 17 -410 17 -250 0 -402 -4 -413 -11z')
    .attr('fill', '#e1a813');
  vmware_pointer.append('path')
    .attr('d', 'M943 123 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z')
    .attr('fill', '#e1a813');

  let projection = d3.geoMercator()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height * 3 / 5]);

  let path = d3.geoPath()
    .projection(projection);

  if (!drupalSettings.cloud || !drupalSettings.cloud.cloud_config_location_json_url) {
    return;
  }
  let json_url = drupalSettings.cloud.cloud_config_location_json_url;

  if (!drupalSettings.cloud || !drupalSettings.cloud.cloud_location_map_json_url) {
    return;
  }
  let map_json_url = drupalSettings.cloud.cloud_location_map_json_url;

  // Create a tooltip.
  let tooltip = d3.select('body')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'map_tooltip')
    .style('font-size', '0.8em')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('position', 'absolute')
    .on('mouseover', function () {
      tooltip.transition()
        .style('opacity', 1);
    })
    .on('mouseleave', function () {
      tooltip.transition()
        .style('opacity', 0);
    });

  let mouseover = function (d) {
    let parent = this.parentNode;
    let node = d3.select(this).node();
    let children = $(parent).children();
    if (children[children.length - 1] !== node) {
      parent.insertBefore(this, null);
    }
    let clientRect = this.getBoundingClientRect();
    let x = window.pageXOffset + clientRect.left;
    let y = window.pageYOffset + clientRect.top;
    tooltip.transition();
    let items = [];
    d.Items.forEach(function (item) {
      if (item.Image !== '') {
        items.push('<div><a href="' + item.Url + '">' + '<img src="' + item.Image + '"></a></div>');
        items.push('<div>');
        items.push('<a href="' + item.Url + '">' + item.Name + '</a>');
        items.push('<br/><span class="location"><span class="glyphicon glyphicon-map-marker"></span>' + d.City + ', ' + d.Country + '</span>');
        items.push('</div>');
      }
      else {
        items.push('<div><a href="' + item.Url + '">' + item.Name + '</a></div>');
        items.push('<span class="location"><span class="glyphicon glyphicon-map-marker"></span>' + d.City + ', ' + d.Country + '</span>');
        items.push('</div>');
      }
    });

    tooltip.html(items.join(''))
      .style('text-align', 'center')
      .style('opacity', 1)
      .style('left', (x - 20) + 'px')
      .style('top', (y + 25) + 'px');
  };

  let mouseleave = function (d) {
    tooltip.transition()
      .style('opacity', 0);
  };

  d3.json(map_json_url).then(function (json) {
    svg.append('path')
      .attr('d', path(json))
      .attr('class', 'map');
    let g = svg.append('g');
    d3.json(json_url).then(function (data) {
      g.selectAll('a')
        .data(data)
        .enter()
        .append('a')
        .attr('href', function (d) {
          if (d.Items.length === 1) {
            return d.Items[0].Url;
          }
        })
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)
        .append('use')
        .attr('href', function (d) {
          if (d.Type === 'aws_cloud') {
            return '#aws_pointer';
          }
          else if (d.Type === 'k8s') {
            return '#k8s_pointer';
          }
          else if (d.Type === 'openstack') {
            return '#openstack_pointer';
          }
          else if (d.Type === 'vmware') {
            return '#vmware_pointer';
          }
          return '#pointer';
        })
        .attr('x', function (d) {
          return projection([d.Longitude, d.Latitude])[0];
        })
        .attr('y', function (d) {
          return projection([d.Longitude, d.Latitude])[1];
        })
        .attr('class', function (d) {
          if (d.OwnLocation) {
            return d.Type + ' ' + 'own_location';
          }
          else {
            return d.Type;
          }
        })
        .attr('fill', '#f69393')
        .attr('stroke', '#f69393')
        .attr('stroke-width', '1px');
    });
  });

  d3.select('body')
    .style('position', 'static');

}(jQuery, drupalSettings));