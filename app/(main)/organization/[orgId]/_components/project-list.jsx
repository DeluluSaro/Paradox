import { getProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./delete-project";


export default async function ProjectList({ orgId }) {
  const projects = await getProjects(orgId);

  if (projects.length === 0) {
    return (
      <p>
        No Projects Found.{" "}
        <Link className="underline underline-offset-2 text-blue-400" href={"/project/create"}>
          Create New Project
        </Link>
      </p>
    );
  }

  return (
    <div className="grid grid-col-1 md:grid-cols-3 gap-4">
      {projects.map((project) => (
        
          <Card key={project.id} className="relative z-10">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {project.name}
                <DeleteProject projectId={project.id} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{project.description}</p>
              <Link href={`/project/${project.id}`} className="text-blue-600 hover:underline">
                View Project
              </Link>
            </CardContent>
          </Card>
        
      ))}
    </div>
  );
}
