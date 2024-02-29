const vOnClickOutside = {
  mounted: (el, binding) => {
    el.onClickOutside = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value();
      }
    };

    setTimeout(() => {
      document.addEventListener('click', el.onClickOutside);
    }, 100);
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.onClickOutside);
  },
};

export default vOnClickOutside;
