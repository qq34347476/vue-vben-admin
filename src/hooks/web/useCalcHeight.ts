import { ref, Ref, unref } from 'vue';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';

// 获得wrapperRef适应屏幕的高度
export function useCalcHeight(wrapperRef: Ref<HTMLDivElement | null>) {
  useWindowSizeFn(calcHeight, 150, { immediate: true });

  const heightRef = ref(0);

  function calcHeight() {
    const wrapper = unref(wrapperRef);
    if (!wrapper) {
      return;
    }
    const top = wrapper.getBoundingClientRect().top;

    heightRef.value = window.innerHeight - top;
  }

  return { heightRef };
}
