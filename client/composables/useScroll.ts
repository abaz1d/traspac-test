export default function useScroll() {
  const isScrolled = ref(false)

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    isScrolled.value = window.scrollY > 0
  }

  return {
    isScrolled,
  }
}
