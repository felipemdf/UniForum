const vOnClickOutside = {
  mounted: (el: any, binding: any) => {
    el.onClickOutside = (event: any) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value();
      }
    };

    setTimeout(() => {
      document.addEventListener('click', el.onClickOutside);
    }, 100);
  },
  unmounted: (el: any) => {
    document.removeEventListener('click', el.onClickOutside);
  }
};

export default vOnClickOutside;
