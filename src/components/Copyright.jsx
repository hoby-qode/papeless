const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-center py-10" id="copyright">
      @ Copyright {currentYear} by{" "}
      <a
        href="https://www.facebook.com/profile.php?id=100085414044869"
        target="_blank"
        className="text-white underline underline-offset-8"
      >
        Twenty twoo
      </a>
    </div>
  );
};

export default Copyright;
