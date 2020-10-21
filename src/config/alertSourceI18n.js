export const logFields = {
    "_cw_raw_time": { label: "日志原始时间", showVi: true },
    "_cw_collect_time": { label: "日志采集时间", showVi: true },
    "_cw_collect_host": { label: "采集器主机名", showVi: true },
    "_cw_collect_ip": { label: "采集器ip", showVi: true },
    "_cw_insert_time": { label: "日志入库时间", showVi: true },
    "_cw_log_type": { label: "日志类型", showVi: true },
    "_cw_log_path": { label: "日志路径", showVi: true },
    "_cw_uuid": { label: "日志唯一标识", showVi: false },
    "_cw_message": { label: "日志原始内容", showVi: false },
    "_cw_app": { label: "日志应用标识", showVi: true },
    "_cw_line_num": { label: "日志行号", showVi: true },
    "_cw_log_tag": { label: "标签", showVi: true },
    "_partition_day": { label: "_partition_day", showVi: false },
    "_cw_biz": { label: "业务名称", showVi: true },
    "_cw_cluster": { label: "集群标识", showVi: true },
    "_cw_collect_id": { label: "采集器标识", showVi: true },
    "_cw_collect_type": { label: "采集器类型", showVi: true },
    "_cw_host_ip": { label: "主机内网ip", showVi: true },
    "_cw_hostname": { label: "主机名称", showVi: true },
    "_cw_parent_span_id": { label: "调用链父跨度ID", showVi: true },
    "_cw_pod_name": { label: "POD名称", showVi: true },
    "_cw_span_id": { label: "调用链跨度ID", showVi: true },
    "_cw_trace_id": { label: "调用链ID", showVi: true }
}
export const checkField = (key) => {
    let Key = key !== undefined ? key.toLowerCase() : key;
    return logFields[Key] ? logFields[Key].label : key;
}  