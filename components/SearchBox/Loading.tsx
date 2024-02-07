export default ({ searchParams }) => {
  return (
    <form>
      <div className="tr box">
        <div className="td"></div>
        <div className="td">
          <input type="text" name="no" value={searchParams.no}></input>
        </div>
        <div className="td">
          <input type="text" name="name" value={searchParams.name}></input>
        </div>
        <div className="td"></div>
        <div className="td"></div>
        <div className="td"></div>
      </div>
    </form>
  );
};
