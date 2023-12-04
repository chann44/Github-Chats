interface ServerViewProps {
  params: {
    serverId: string;
  };
}

export default function ServerView(props: ServerViewProps) {
  return <>{props.params.serverId}</>;
}
