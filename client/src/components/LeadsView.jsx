import LeadTable from "./LeadTable";
import { Plus } from "lucide-react";
import "./LeadsView.css";

function LeadsView({
  list,
  query,
  setquery,
  filt,
  setfilt,
  page,
  setpage,
  pages,
  setcur,
  setopen,
  dellead,
  load,
}) {
  return (
    <>
      <header className="head">
        <h1>All Active Leads</h1>
        <button
          className="btn btn-with-icon"
          onClick={() => {
            setcur(null);
            setopen(true);
          }}
        >
          <Plus className="btn-icon" /> Add Lead
        </button>
      </header>

      <LeadTable
        list={list}
        query={query}
        setquery={setquery}
        filt={filt}
        setfilt={setfilt}
        page={page}
        setpage={setpage}
        pages={pages}
        onedit={(item) => {
          setcur(item);
          setopen(true);
        }}
        ondel={async (id) => {
          if (confirm("Delete?")) {
            await dellead(id);
            load();
          }
        }}
      />
    </>
  );
}

export default LeadsView;
