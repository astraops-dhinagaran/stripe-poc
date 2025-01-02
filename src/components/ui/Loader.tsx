import { ProgressSpinner } from "primereact/progressspinner";

function Loader() {
    return (
        <div className="w-full flex items-center justify-center h-full">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
    );
}

export default Loader;